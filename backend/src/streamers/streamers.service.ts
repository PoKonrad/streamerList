import { Injectable } from '@nestjs/common';
import { CreateStreamerDto } from './dto/create-streamer.dto';
import { UpdateStreamerDto } from './dto/update-streamer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Streamer } from './entities/streamer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class StreamersService {
  constructor(
    @InjectRepository(Streamer)
    private StreamerRepo: Repository<Streamer>,
  ) {}

  create(createStreamerDto: CreateStreamerDto) {
    this.StreamerRepo.insert(createStreamerDto);
    return 'cool';
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

  update(id: number, updateStreamerDto: UpdateStreamerDto) {
    return `This action updates a #${id} streamer`;
  }
}
