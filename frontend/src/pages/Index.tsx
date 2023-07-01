import { Box, Button, Fade, Typography, styled } from "@mui/material";
import StreamerCard from "../components/StreamerCard";
import { useQuery, useQueryClient } from "react-query";
import type { Streamer, StreamerResp } from "../types";
import { Add } from "@mui/icons-material";
import NewStreamer from "../components/NewStreamer";
import { createContext, useEffect, useState } from "react";
import StreamerHeader from "../components/StreamerHeader";
import { socket } from "../socket";
import apiClient from "../apiClient";
import { AxiosError, AxiosResponse } from "axios";

const Bar = styled("div")({
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
});

const CardsContainer = styled(Box)({
  display: "flex",
  gap: "2rem",
  width: "100%",
  flexWrap: "wrap",
  justifyContent: "center",
});

interface ModalContextValue {
  modalOpen: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalContext = createContext<ModalContextValue>({
  modalOpen: false,
  setModalOpen: () => "",
});

const Index = () => {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery<
    AxiosResponse<StreamerResp>,
    AxiosError
  >(["streamers"], {
    queryFn: () => apiClient.get("/streamers"),
    cacheTime: 0,
  });

  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const onNewStreamerEvent = () => {
      queryClient.invalidateQueries("streamers");
    };
    socket.on("newStreamer", onNewStreamerEvent);
    return () => {
      socket.off("newStreamer", onNewStreamerEvent);
    };
  }, []);

  if (isLoading) {
    return null;
  }

  if (isError) {
    <Typography>An error has occured</Typography>;
    <Typography>{error.message}</Typography>;
  }

  return (
    <Fade in={!isLoading}>
      <div>
        <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
          <NewStreamer />
        </ModalContext.Provider>
        <StreamerHeader
          text={`Today's spotlight`}
          streamer={data?.data[0]}
          img={`https://cataas.com/cat?t=5`}
        />
        <Bar>
          <Typography variant="h3">Browse</Typography>
          <Button onClick={() => setModalOpen(true)} startIcon={<Add />}>
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
