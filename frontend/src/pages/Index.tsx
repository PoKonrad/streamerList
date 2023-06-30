import { Box, Button, Fade, Typography, styled } from "@mui/material";
import StreamerCard from "../components/StreamerCard";
import Spotlight from "../components/Spotlight";
import { useQuery } from "react-query";
import type { Streamer } from "../types";
import { Add } from "@mui/icons-material";
import NewStreamer from "../components/NewStreamer";

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

const Index = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data, isLoading, isError, error } = useQuery(["streamers"], () =>
    fetch("/api/streamers").then((resp) => resp.json())
  );
  console.log(data);

  if (isLoading) {
    return null;
  }

  return (
    <Fade in={!isLoading}>
      <div>
        <NewStreamer />
        <Spotlight streamers={data} />
        <Bar>
          <Typography variant="h3">Browse</Typography>
          <Button startIcon={<Add />}>new streamer</Button>
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
