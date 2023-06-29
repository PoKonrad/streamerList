import { Paper, Typography, styled } from "@mui/material";
import { Streamer, StreamerResp } from "../types";
import React, { useEffect, useState } from "react";

const Background = styled("div")({
  position: "relative",
  isolation: "isolate",
  paddingBlock: "6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "20%",

  "&::after": {
    content: "''",
    background:
      "linear-gradient(47deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    transform: "skewY(-5deg) translate(-20px)",
    margin: 0,
    padding: 0,
    width: "102vw",
  },
});

const SpotlightContainer = styled("div")({
  height: "72vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "skewY(-4deg)",
});

const ImageContainer = styled(Paper)({
  maxWidth: "25rem",
  maxHeight: "25rem",
  minWidth: "20rem",
  minHeight: "20rem",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  borderRadius: "1rem",
  transform: "skewY(-4deg)",
});

interface SpotlightProps {
  streamers: StreamerResp;
}

const Spotlight: React.FC<SpotlightProps> = ({ streamers }) => {
  const [spotlightStreamer, setSpotlightStreamer] = useState<
    Streamer | undefined
  >();

  useEffect(() => {
    setSpotlightStreamer(
      streamers[Math.floor(Math.random() * streamers?.length)]
    );
  }, []);

  if (!streamers) {
    return null;
  }

  return (
    <SpotlightContainer>
      <Background>
        <TextContainer>
          <Typography
            variant="h2"
            sx={{
              letterSpacing: "-2px",
            }}
          >
            Today's Spotlight
          </Typography>
          <Typography variant="h3">{spotlightStreamer?.name}</Typography>
        </TextContainer>
        <ImageContainer>
          <img src="https://cataas.com/cat" />
        </ImageContainer>
      </Background>
    </SpotlightContainer>
  );
};

export default Spotlight;
