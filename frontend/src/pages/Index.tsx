import { Box, Typography, styled } from "@mui/material";
import React from "react";
import StreamerCard from "../components/StreamerCard";
import Spotlight from "../components/Spotlight";
import { useQuery } from "react-query";
import { Streamer } from "../types";
import Streamer from "./Streamer";

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

  return (
    <>
      <Spotlight />
      <Typography variant="h3">Browse</Typography>
      <CardsContainer>
        {isLoading
          ? null
          : data.map((streamer: Streamer) => (
              <StreamerCard streamer={streamer} key={streamer.id} />
            ))}
      </CardsContainer>
    </>
  );
};

export default Index;
