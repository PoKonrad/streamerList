import { IsEnum, Length } from 'class-validator';
import { Platform } from '../types';

export class CreateStreamerDto {
  @Length(2, 30)
  name: string;

  @Length(2, 500)
  description: string;

  @IsEnum(['twitch', 'youtube', 'tiktok', 'kick', 'rumble'], {
    message: 'Incorrect platform',
  })
  platform: Platform;
}
