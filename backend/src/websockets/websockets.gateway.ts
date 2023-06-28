import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Subscription } from 'rxjs';
import { WebsocketsService } from './websockets.service';

@WebSocketGateway({
  cors: '*',
})
export class WebsocketsGateway {
  private eventSubscription: Subscription;
  constructor(private readonly service: WebsocketsService) {}

  @SubscribeMessage('events')
  handleEvent(@MessageBody('id') id: number): number {
    return id;
  }

  afterInit(server): void {
    this.eventSubscription = this.service.getEventSubject$().subscribe({
      next: (event) => server.emit(event.name, event.data),
      error: (err) => server.emit('exception', err),
    });
  }

  onApplicationShutdown() {
    this.eventSubscription.unsubscribe();
  }
}
