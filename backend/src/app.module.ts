import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StreamersModule } from './streamers/streamers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Streamer } from './streamers/entities/streamer.entity';
import { WebsocketsModule } from './websockets/websockets.module';

@Module({
  imports: [
    StreamersModule,
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'streamersDB.db',
      entities: [Streamer],
      synchronize: true,
    }),
    WebsocketsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
