import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import StreamerHeader from '../components/StreamerHeader';
import { Streamer as StreamerType } from '../types';
import { Fade, LinearProgress, Paper, Typography, styled } from '@mui/material';
import apiClient from '../apiClient';
import type { AxiosError, AxiosResponse } from 'axios';

const Description = styled(Paper)({
  minHeight: '10rem',
  borderRadius: '1rem',
  margin: '1rem',
  padding: '1rem',
  wordWrap: 'break-word'
});

const StreamerType = () => {
  const params = useParams();
  const { data, isLoading, isError, error } = useQuery<AxiosResponse<StreamerType>, AxiosError>(
    ['streamer'],
    {
      queryFn: () => {
        return apiClient.get(`/streamers/${params.id}`);
      }
    }
  );

  if (isLoading) {
    return <LinearProgress />;
  }

  if (isError) {
    return (
      <>
        <Typography variant="h2">An error has occured</Typography>
        <Typography>{error.message}</Typography>
      </>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <Fade in>
      <div>
        <StreamerHeader
          text={`${data?.data?.platform} streamer`}
          streamer={data?.data}
          img="https://cataas.com/cat"
        />
        <Description>{data?.data?.description}</Description>
      </div>
    </Fade>
  );
};

export default StreamerType;
