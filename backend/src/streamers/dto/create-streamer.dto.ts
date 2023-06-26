import { Platform } from '../types';

export class CreateStreamerDto {
  name: string;

  description: string;

  platform: Platform;

  upvotesCount: number;
}
