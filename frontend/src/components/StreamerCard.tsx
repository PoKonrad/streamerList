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

const StreamerCard = () => {
  return (
    <CardContainer>
      <CardHeader
        disableTypography={true}
        title={
          <TitleContainer>
            <Typography variant="h5">Streamer Name</Typography>
            <img src="icons/twitch.svg" height={30} />
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
            color={0 < 0 ? red[400] : 0 > 0 ? green[400] : grey[400]}
          >
            1m
          </Typography>
          <IconButton>
            <KeyboardArrowDown />
          </IconButton>
        </CardFooter>
      </CardContentContainer>
      <CardContent>
        <div>Miau miau miau</div>
      </CardContent>
    </CardContainer>
  );
};

export default StreamerCard;
