import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Platform } from '../types';

@Entity()
export class Streamer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  platform: Platform;

  @Column({
    default: 0,
  })
  upvotesCount: number;
}
