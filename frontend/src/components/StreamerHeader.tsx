import { Paper, Typography, styled } from "@mui/material";
import { Streamer } from "../types";
import React from "react";

const Background = styled("div")({
  position: "relative",
  isolation: "isolate",
  paddingBlock: "6rem",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  height: "40%",

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
    boxShadow: "-8px 8px 24px 0px rgba(0, 0, 0, 0.3)",
  },
});

const StreamerHeaderContainer = styled("div")({
  height: "72vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

const TextContainer = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  transform: "skewY(-5deg) translateY(30px)",
  boxShadow: "-8px 8px 24px 0px rgba(0, 0, 0, 0.3)",
  padding: "4rem",
  backgroundColor: "rgba(0, 0, 0, 0.1)",
  borderRadius: "1rem",
});

const ImageContainer = styled(Paper)({
  width: "22rem",
  height: "22rem",
  overflow: "hidden",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "2rem",
  borderRadius: "1rem",
  transform: "skewY(-5deg) translateY(30px)",
  boxShadow: "-8px 8px 24px 0px rgba(0, 0, 0, 0.5)",
});

interface StreamerHeaderProps {
  streamer: Streamer | undefined;
  text: string | undefined;
  img: string | undefined;
}

const StreamerHeader: React.FC<StreamerHeaderProps> = ({
  streamer,
  text,
  img,
}) => {
  if (!streamer) {
    return null;
  }

  return (
    <StreamerHeaderContainer>
      <Background>
        <TextContainer>
          <Typography
            variant="h2"
            sx={{
              letterSpacing: "-2px",
            }}
          >
            {text}
          </Typography>
          <Typography variant="h3">{streamer?.name}</Typography>
        </TextContainer>
        <ImageContainer>
          <img src={img} />
        </ImageContainer>
      </Background>
    </StreamerHeaderContainer>
  );
};

export default StreamerHeader;
