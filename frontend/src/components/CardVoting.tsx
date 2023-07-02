import { KeyboardArrowUp, KeyboardArrowDown } from '@mui/icons-material';
import { IconButton, Typography, styled } from '@mui/material';
import { green, red, grey } from '@mui/material/colors';
import React, { useEffect } from 'react';
import { Streamer } from '../types';
import { useNotification } from '../hooks/useNotifaction';
import { AxiosError } from 'axios';
import { useVoting } from '../hooks/useVoting';
import { useStreamerUpvoteCount } from '../hooks/useStreamerUpvoteCount';

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

interface CardVotingProps {
  streamer: Streamer;
}

const CardVoting: React.FC<CardVotingProps> = ({ streamer }) => {
  const { upvotesCount } = useStreamerUpvoteCount(streamer);
  const { handleDownvote, handleUpvote, error, isError, selectedVote } = useVoting(streamer);
  const { errorNotification } = useNotification();

  useEffect(() => {
    if (isError) {
      errorNotification(`An error has occured: ${(error as AxiosError).message}`);
    }
  }, [error, errorNotification, isError]);

  return (
    <VotingContainer onClick={(e) => e.stopPropagation()}>
      <IconButton onClick={handleUpvote} disabled={selectedVote === 'downvote'}>
        <KeyboardArrowUp sx={{ color: selectedVote === 'upvote' ? green[400] : null }} />
      </IconButton>
      <Typography
        variant="subtitle1"
        color={upvotesCount < 0 ? red[400] : upvotesCount > 0 ? green[400] : grey[400]}>
        {upvotesCount}
      </Typography>
      <IconButton onClick={handleDownvote} disabled={selectedVote === 'upvote'}>
        <KeyboardArrowDown sx={{ color: selectedVote === 'downvote' ? red[400] : null }} />
      </IconButton>
    </VotingContainer>
  );
};

export default CardVoting;
