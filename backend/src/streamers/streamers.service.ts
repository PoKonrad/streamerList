import { Injectable } from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { updateStreamerUpvoteDto } from './dto/update-steamer-upvote.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from './entities/streamer.entity';
import { Repository } from 'typeorm';
import { WebsocketsService } from 'src/websockets/websockets.service';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer)
    private StreamerRepo: Repository<Streamer>,
    private readonly Websocket: WebsocketsService,
  ) {}

  create(createStreamerDto: CreateStreamerDto) {
    this.StreamerRepo.insert(createStreamerDto);
    this.Websocket.addEvent('newStreamer', JSON.stringify(createStreamerDto));
  }

  findAll() {
    return this.StreamerRepo.find();
  }

  findOne(id: number) {
    return this.StreamerRepo.findOne({
      where: {
        id: id,
      },
    });
  }

  async updateUpvotes(
    id: string,
    updateStreamerUpvote: updateStreamerUpvoteDto,
  ) {
    console.log(updateStreamerUpvote.type);
    switch (updateStreamerUpvote.type) {
      case 'upvote':
        console.log('miau');
        await this.StreamerRepo.createQueryBuilder()
          .update(Streamer)
          .whereInIds(1)
          .set({ upvotesCount: () => 'upvotesCount + 1' })
          .execute();
        break;
      case 'downvote':
        await this.StreamerRepo.createQueryBuilder()
          .update(Streamer)
          .set({ downvotesCount: () => 'downvotesCount + 1' })
          .whereInIds(id)
          .execute();
    }

    return;
  }
}
