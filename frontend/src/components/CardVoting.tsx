import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { IconButton, Typography, styled } from '@mui/material';
import { green, red, grey } from '@mui/material/colors';
import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import apiClient from '../apiClient';
import { socket } from '../socket';
import { Streamer } from '../types';

const VotingContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-around',
  alignItems: 'center',
  columnGap: '0.2rem',
  position: 'absolute',
  background: 'rgba(0, 0, 0, 0.5)',
  height: 144,
  right: 0,
  zIndex: '1',

  '& .MuiTypography-root': {
    textAlign: 'center'
  }
});

interface UpvoteMutatationParams {
  id: number;
  type: 'upvote' | 'downvote';
}

interface CardVotingProps {
  streamer: Streamer;
}

const CardVoting: React.FC<CardVotingProps> = ({ streamer }) => {
  useEffect(() => {
    const updateUpvotes = (newCount: string) => {
      setUpvotesCount(JSON.parse(newCount).newCount);
    };

    socket.on(`upvotes/${streamer.id}`, updateUpvotes);

    return () => {
      socket.off(`upvotes/${streamer.id}`, updateUpvotes);
    };
  }, []);

  const { mutate } = useMutation({
    mutationFn: (params: UpvoteMutatationParams) => {
      return apiClient.put(`/streamers/${params.id}/vote`, {
        type: params.type
      });
    }
  });
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

  const [selectedVote, setSelectedVote] = useState('');
  const [upvotesCount, setUpvotesCount] = useState(streamer.upvotesCount);
  return (
    <VotingContainer onClick={(e) => e.stopPropagation()}>
      <IconButton onClick={handleUpvote} disabled={selectedVote === 'downvote'}>
        <KeyboardArrowUp sx={{ color: selectedVote === 'upvote' ? green[400] : null }} />
      </IconButton>
      <Typography
        variant="subtitle1"
        color={upvotesCount < 0 ? red[400] : upvotesCount > 0 ? green[400] : grey[400]}
      >
        {upvotesCount}
      </Typography>
      <IconButton onClick={handleDownvote} disabled={selectedVote === 'upvote'}>
        <KeyboardArrowDown sx={{ color: selectedVote === 'downvote' ? red[400] : null }} />
      </IconButton>
    </VotingContainer>
  );
};

export default CardVoting;
