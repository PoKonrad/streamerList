export type StreamerResp = Streamer[];

export interface Streamer {
  id: number;
  name: string;
  description: string;
  platform: string;
  upvotesCount: number;
  downvotesCount: number;
}

export interface StreamerBody {
  name: string;
  description: string;
  platform: string;
}

export type Platform = "Twitch" | "YouTube" | "TikTok" | "Kick" | "Rumble";
