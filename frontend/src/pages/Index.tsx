import { Box, Typography, styled } from "@mui/material";
import React from "react";
import StreamerCard from "../components/StreamerCard";

const CardsContainer = styled(Box)({
  display: "flex",
  gap: "2rem",
  width: "100%",
  flexWrap: "wrap",
  justifyContent: "center",
});

const Index = () => {
  return (
    <>
      <Typography variant="h3">Browse</Typography>
      <CardsContainer>
        <StreamerCard />
        <StreamerCard />
        <StreamerCard />
        <StreamerCard />
        <StreamerCard />
        <StreamerCard />
        <StreamerCard />
        <StreamerCard />
      </CardsContainer>
    </>
  );
};

export default Index;
