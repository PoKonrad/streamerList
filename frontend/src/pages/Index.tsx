import { Box, Button, Fade, LinearProgress, Typography, styled } from '@mui/material';
import StreamerCard from '../components/StreamerCard';
import { useQuery, useQueryClient } from 'react-query';
import type { Streamer, StreamerResp } from '../types';
import { Add } from '@mui/icons-material';
import NewStreamer from '../components/NewStreamer';
import { createContext, useEffect, useState } from 'react';
import StreamerHeader from '../components/StreamerHeader';
import { socket } from '../socket';
import apiClient from '../apiClient';
import { AxiosError, AxiosResponse } from 'axios';
import { useNewStreamerEvent } from '../hooks/useNewStreamerEvent';

const Bar = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '1rem',
  marginInline: '0.5rem'
});

const CardsContainer = styled(Box)({
  display: 'flex',
  width: '100%',
  flexWrap: 'wrap',
  justifyContent: 'center'
});

interface FormDialogContextValue {
  formDialogOpen: boolean;
  setFormDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FormDialogContext = createContext<FormDialogContextValue>({
  formDialogOpen: false,
  setFormDialogOpen: () => ''
});

const Index = () => {
  const { data, isLoading, isError, error } = useQuery<AxiosResponse<StreamerResp>, AxiosError>(
    ['streamers'],
    {
      queryFn: () => apiClient.get('/streamers'),
      cacheTime: 0
    }
  );

  const [formDialogOpen, setFormDialogOpen] = useState(false);
  useNewStreamerEvent();

  if (isLoading) {
    return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress />
      </Box>
    );
  }

  if (isError) {
    <Typography>An error has occured</Typography>;
    <Typography>{error.message}</Typography>;
  }

  return (
    <Fade in={!isLoading}>
      <div>
        <FormDialogContext.Provider
          value={{
            formDialogOpen: formDialogOpen,
            setFormDialogOpen: setFormDialogOpen
          }}
        >
          <NewStreamer />
        </FormDialogContext.Provider>
        <StreamerHeader
          text={`Today's spotlight`}
          streamer={data?.data[0]}
          img={`https://cataas.com/cat?t=5`}
        />
        <Bar>
          <Typography variant="h3">Browse</Typography>
          <Button onClick={() => setFormDialogOpen(true)} startIcon={<Add />}>
            new streamer
          </Button>
        </Bar>
        <CardsContainer>
          {data?.data
            ? data?.data?.map((streamer: Streamer) => (
                <StreamerCard streamer={streamer} key={streamer.id} />
              ))
            : null}
        </CardsContainer>
      </div>
    </Fade>
  );
};

export default Index;
