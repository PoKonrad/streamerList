import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import {
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";
import { Platform, Streamer } from "../types";
import React, { useEffect, useState } from "react";
import PlatformIcon from "./PlatformIcon";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { socket } from "../socket";

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

const CardVoting = styled("div")({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  alignItems: "center",
  columnGap: "0.2rem",
  position: "absolute",
  background: "rgba(0, 0, 0, 0.5)",
  height: 144,
  right: 0,
  zIndex: "1",

  "& .MuiTypography-root": {
    textAlign: "center",
  },
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

interface UpvoteMutatationParams {
  id: number;
  type: "upvote" | "downvote";
}

const StreamerCard: React.FC<StreamerCardProps> = ({ streamer }) => {
  const navigate = useNavigate();
  const [randomImgNumber, setRandomImgNumber] = useState(0);
  const [upvotesCount, setUpvotesCount] = useState(streamer.upvotesCount);
  useEffect(() => {
    setRandomImgNumber(Math.floor(Math.random() * 3000));
  }, []);

  useEffect(() => {
    const updateUpvotes = (newCount: string) => {
      setUpvotesCount(JSON.parse(newCount).newCount);
    };

    socket.on(`upvotes/${streamer.id}`, updateUpvotes);

    return () => {
      socket.off(`upvotes/${streamer.id}`, updateUpvotes);
    };
  }, []);

  const { mutate, isLoading, isError, error } = useMutation({
    mutationFn: (params: UpvoteMutatationParams) => {
      return fetch(`/api/streamers/${params.id}`, {
        method: "PUT",
        body: JSON.stringify({
          type: params.type,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    },
  });
  const handleUpvote = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedVote === "upvote") {
      setSelectedVote("");
      mutate({
        id: streamer.id,
        type: "downvote",
      });
      return;
    }
    mutate({
      id: streamer.id,
      type: "upvote",
    });
    setSelectedVote("upvote");
  };

  const handleDownvote = (e: MouseEvent) => {
    e.stopPropagation();
    if (selectedVote === "downvote") {
      setSelectedVote("");
      mutate({
        id: streamer.id,
        type: "upvote",
      });
      return;
    }
    mutate({
      id: streamer.id,
      type: "downvote",
    });
    setSelectedVote("downvote");
  };

  const [selectedVote, setSelectedVote] = useState("");
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
          <CardVoting>
            <IconButton
              onClick={handleUpvote}
              disabled={selectedVote === "downvote"}
            >
              <KeyboardArrowUp
                sx={{ color: selectedVote === "upvote" ? green[400] : null }}
              />
            </IconButton>
            <Typography
              variant="subtitle1"
              color={
                upvotesCount < 0
                  ? red[400]
                  : upvotesCount > 0
                  ? green[400]
                  : grey[400]
              }
            >
              {upvotesCount}
            </Typography>
            <IconButton
              onClick={handleDownvote}
              disabled={selectedVote === "upvote"}
            >
              <KeyboardArrowDown
                sx={{ color: selectedVote === "downvote" ? red[400] : null }}
              />
            </IconButton>
          </CardVoting>
        </CardMediaContainer>

        <CardContentDescription>{streamer.description}</CardContentDescription>
      </CardActionArea>
    </CardContainer>
  );
};

export default StreamerCard;
