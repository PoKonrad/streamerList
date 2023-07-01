import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  styled,
} from "@mui/material";
import { Platform, Streamer } from "../types";
import React, { useEffect, useState } from "react";
import PlatformIcon from "./PlatformIcon";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";
import apiClient from "../apiClient";
import CardVoting from "./CardVoting";

const CardContainer = styled(Card)({
  minWidth: "20rem",
  maxWidth: "25rem",
  height: "25rem",
  flexGrow: "1",
});

const CardMediaContainer = styled("div")({
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: 144,
  position: "relative",
});

const CardContentDescription = styled(CardContent)({
  height: "10rem",
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

interface StreamerCardProps {
  streamer: Streamer;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer }) => {
  const navigate = useNavigate();

  // random number for random cat images
  const [randomImgNumber, setRandomImgNumber] = useState(0);
  useEffect(() => {
    setRandomImgNumber(Math.floor(Math.random() * 3000));
  }, []);

  return (
    <CardContainer>
      <CardActionArea onClick={() => navigate(`/streamer/${streamer.id}`)}>
        <CardHeader
          disableTypography={true}
          title={
            <TitleContainer>
              <Typography variant="h5">{streamer.name}</Typography>
              <PlatformIcon platform={streamer.platform as Platform} />
            </TitleContainer>
          }
        />
        <CardMediaContainer>
          <CardMedia
            image={`https://cataas.com/cat?t=${randomImgNumber}`}
            component={"img"}
            height="144"
          />
          <CardVoting streamer={streamer} />
        </CardMediaContainer>
        <CardContentDescription>{streamer.description}</CardContentDescription>
      </CardActionArea>
    </CardContainer>
  );
};

export default StreamerCard;
