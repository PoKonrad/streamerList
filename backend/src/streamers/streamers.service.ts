import { Injectable, NotFoundException } from '@nestjs/common';
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
    return createStreamerDto;
  }

  findAll() {
    return this.StreamerRepo.find();
  }

  async findOne(id: number) {
    const streamer = await this.StreamerRepo.findOne({
      where: {
        id: id,
      },
    });
    if (!streamer?.name) {
      throw new NotFoundException('Streamer not found');
    }
    return streamer;
  }

  async updateUpvotes(
    id: string,
    updateStreamerUpvote: updateStreamerUpvoteDto,
  ) {
    await this.StreamerRepo.createQueryBuilder()
      .update(Streamer)
      .whereInIds(id)
      .set({
        upvotesCount: () =>
          `upvotesCount ${
            updateStreamerUpvote.type === 'upvote' ? '+ 1' : '- 1'
          }`,
      })
      .execute();

    const streamer: Streamer = await this.StreamerRepo.findOneBy({
      id: parseInt(id),
    });

    this.Websocket.addEvent(
      `upvotes/${id}`,
      JSON.stringify({ newCount: streamer.upvotesCount }),
    );
    return;
  }
}
