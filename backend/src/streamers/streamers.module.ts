import { Module } from '@nestjs/common';
import { StreamersService } from './streamers.service';
import { StreamersController } from './streamers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './entities/streamer.entity';
import { WebsocketsModule } from 'src/websockets/websockets.module';

@Module({
  controllers: [StreamersController],
  providers: [StreamersService],
  imports: [TypeOrmModule.forFeature([Streamer]), WebsocketsModule],
})
export class StreamersModule {}
