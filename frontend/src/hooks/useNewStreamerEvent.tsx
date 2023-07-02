import { useEffect } from 'react';
import { socket } from '../socket';
import { useQueryClient } from 'react-query';

export const useNewStreamerEvent = () => {
  const queryClient = useQueryClient();
  useEffect(() => {
    const onNewStreamerEvent = () => {
      queryClient.invalidateQueries('streamers');
    };
    socket.on('newStreamer', onNewStreamerEvent);
    return () => {
      socket.off('newStreamer', onNewStreamerEvent);
    };
  }, []);
};
