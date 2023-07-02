import { useEffect, useState } from 'react';
import { Streamer } from '../types';
import { socket } from '../socket';

export const useStreamerUpvoteCount = (streamer: Streamer) => {
  const [upvotesCount, setUpvotesCount] = useState(streamer.upvotesCount);

  useEffect(() => {
    const updateUpvotes = (newCount: string) => {
      setUpvotesCount(JSON.parse(newCount).newCount);
    };

    socket.on(`upvotes/${streamer.id}`, updateUpvotes);

    return () => {
      socket.off(`upvotes/${streamer.id}`, updateUpvotes);
    };
  }, []);

  return { upvotesCount };
};
