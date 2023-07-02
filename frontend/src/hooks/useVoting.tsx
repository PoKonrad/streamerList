import { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import apiClient from '../apiClient';
import { Streamer } from '../types';

interface UpvoteMutatationParams {
  id: number;
  type: 'upvote' | 'downvote';
}

export const useVoting = (streamer: Streamer) => {
  const [selectedVote, setSelectedVote] = useState(
    JSON.parse(localStorage.getItem('votesStatus') || '[]')?.find(
      (el: UpvoteMutatationParams) => el.id === streamer.id
    )?.type ?? ''
  );

  // save to localstorage
  useEffect(() => {
    const oldVotes = JSON.parse(localStorage.getItem('votesStatus') || '[]');
    const a = oldVotes.filter((el: UpvoteMutatationParams) => el.id !== streamer.id);
    const newVotes = [...a, { id: streamer.id, type: selectedVote }];
    localStorage.setItem('votesStatus', JSON.stringify(newVotes));
  }, [selectedVote]);

  const handleUpvote = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (selectedVote === 'upvote') {
      setSelectedVote('');
      mutate({
        id: streamer.id,
        type: 'downvote'
      });
      return;
    }
    mutate({
      id: streamer.id,
      type: 'upvote'
    });
    setSelectedVote('upvote');
  };

  const handleDownvote = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    if (selectedVote === 'downvote') {
      setSelectedVote('');
      mutate({
        id: streamer.id,
        type: 'upvote'
      });
      return;
    }
    mutate({
      id: streamer.id,
      type: 'downvote'
    });
    setSelectedVote('downvote');
  };

  const { mutate, isError, error } = useMutation({
    mutationFn: (params: UpvoteMutatationParams) => {
      return apiClient.put(`/streamers/${params.id}/vote`, {
        type: params.type
      });
    }
  });

  return { handleDownvote, handleUpvote, isError, error, selectedVote };
};
