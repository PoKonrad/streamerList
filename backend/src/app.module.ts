import { Module } from '@nestjs/common';
import { StreamersModule } from './streamers/streamers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './streamers/entities/streamer.entity';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    StreamersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: './db/streamersDB.db',
      entities: [Streamer],
      synchronize: true,
    }),
    WebsocketsModule,
  ],
})
export class AppModule {}
