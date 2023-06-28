import { ThumbDown, ThumbUp } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
  styled,
} from "@mui/material";
import { green, grey, red } from "@mui/material/colors";

const CardFooter = styled(Box)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  columnGap: "0.2rem",
  marginBlock: "0.5rem",

  "& .MuiTypography-root": {
    width: "1.2rem",
    textAlign: "center",
  },
});

const StreamerCard = () => {
  return (
    <Card
      sx={{
        minWidth: "20rem",
        maxWidth: "25rem",
        flexGrow: "1",
      }}
    >
      <CardHeader title="Streamer name" />
      <CardContent>Miau miau miau</CardContent>
      <CardFooter>
        <IconButton>
          <ThumbDown />
        </IconButton>
        <Typography
          variant="subtitle1"
          color={0 < 0 ? red[400] : 0 > 0 ? green[400] : grey[400]}
        >
          0
        </Typography>
        <IconButton>
          <ThumbUp />
        </IconButton>
      </CardFooter>
    </Card>
  );
};

export default StreamerCard;
