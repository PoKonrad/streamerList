import { Box, Button, Fade, Typography, styled } from "@mui/material";
import StreamerCard from "../components/StreamerCard";
import { useQuery } from "react-query";
import type { Streamer } from "../types";
import { Add } from "@mui/icons-material";
import NewStreamer from "../components/NewStreamer";
import { createContext, useState } from "react";
import StreamerHeader from "../components/StreamerHeader";

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isError, error } = useQuery(["streamers"], () =>
    fetch("/api/streamers").then((resp) => resp.json())
  );
  console.log(data);

  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading) {
    return null;
  }

  return (
    <Fade in={!isLoading}>
      <div>
        <ModalContext.Provider value={{ modalOpen, setModalOpen }}>
          <NewStreamer />
        </ModalContext.Provider>
        <StreamerHeader
          text={`Today's spotlight`}
          streamer={data[0]}
          img={`https://cataas.com/cat?t=5`}
        />
        <Bar>
          <Typography variant="h3">Browse</Typography>
          <Button onClick={() => setModalOpen(true)} startIcon={<Add />}>
            new streamer
          </Button>
        </Bar>
        <CardsContainer>
          {data.map((streamer: Streamer) => (
            <StreamerCard streamer={streamer} key={streamer.id} />
          ))}
        </CardsContainer>
      </div>
    </Fade>
  );
};

export default Index;
