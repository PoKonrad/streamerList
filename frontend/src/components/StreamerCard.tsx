import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { Platform, Streamer } from "../types";
import React from "react";
import PlatformIcon from "./PlatformIcon";

const CardContainer = styled(Card)({
  minWidth: "20rem",
  maxWidth: "25rem",
  height: "25rem",
  flexGrow: "1",
});

const CardContentContainer = styled("div")({
  display: "flex",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "flex-start",
  height: 144,
  position: "relative",
});

const CardFooter = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  columnGap: "0.2rem",
  position: "absolute",
  background: "rgba(0, 0, 0, 0.5)",
  height: 144,
  right: 0,

  "& .MuiTypography-root": {
    textAlign: "center",
  },
});

const TitleContainer = styled("div")({
  display: "flex",
  justifyContent: "space-between",
});

interface StreamerCardProps {
  streamer: Streamer;
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer }) => {
  return (
    <CardContainer>
      <CardHeader
        disableTypography={true}
        title={
          <TitleContainer>
            <Typography variant="h5">{streamer.name}</Typography>
            <PlatformIcon platform={streamer.platform as Platform} />
          </TitleContainer>
        }
      />
      <CardContentContainer>
        <CardMedia
          image={`https://cataas.com/cat?t=${Math.floor(Math.random() * 1000)}`}
          component={"img"}
          height="144"
        />
        <CardFooter>
          <IconButton>
            <KeyboardArrowUp />
          </IconButton>
          <Typography
            variant="subtitle1"
            color={
              streamer.upvotesCount < 0
                ? red[400]
                : streamer.upvotesCount > 0
                ? green[400]
                : grey[400]
            }
          >
            {streamer.upvotesCount}
          </Typography>
          <IconButton>
            <KeyboardArrowDown />
          </IconButton>
        </CardFooter>
      </CardContentContainer>
      <CardContent>{streamer.description}</CardContent>
    </CardContainer>
  );
};

export default StreamerCard;
