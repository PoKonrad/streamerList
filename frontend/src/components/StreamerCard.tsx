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
import { useNavigate } from "react-router-dom";
import CardVoting from "./CardVoting";

const CardContainer = styled("div")({
  maxWidth: "50%",
  width: "25rem",
  flexGrow: 1,
  padding: "0.5rem",
});

const CardElement = styled(Card)({});

const CardActionElement = styled(CardActionArea)({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
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
  overflowWrap: "break-word",
  height: "calc(2.2em + 16px*2)",
  fontSize: "1em",
  textOverflow: "ellipsis",
  overflow: "hidden",
  flexGrow: 1,
  position: "relative",
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",

  "& .MuiTypography-root": {
    maxWidth: "50%",
    textOverflow: "ellipsis",
    overflow: "hidden",
  },

  "& img": {
    flexShrink: 0,
  },
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
      <CardElement>
        <CardActionElement onClick={() => navigate(`/streamer/${streamer.id}`)}>
          <CardHeader
            sx={{
              "& .MuiCardHeader-content": { maxWidth: "100%" },
            }}
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
          <CardContentDescription>
            {streamer.description}
          </CardContentDescription>
        </CardActionElement>
      </CardElement>
    </CardContainer>
  );
};

export default StreamerCard;
