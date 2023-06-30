import { Close } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  MenuItem,
  Select,
  TextField,
  styled,
} from "@mui/material";
const platforms = ["Twitch", "YouTube", "TikTok", "Kick", "Rumble"];

const DialogContentContainer = styled(DialogContent)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  height: "14.6rem",
});

const DialogContentContainerSection = styled("div")({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  justifyContent: "space-between",
  margin: "2rem",
});

const NewStreamer = () => {
  return (
    <Dialog open={false} maxWidth="lg" fullWidth>
      <DialogTitle>
        Add your favorite streamer
        <IconButton sx={{ position: "absolute", right: 8, top: 8 }}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContentContainer>
        <DialogContentContainerSection>
          <TextField label="Streamer Name" />
          <Select label="Platform">
            {platforms.map((el) => (
              <MenuItem value={el.toLowerCase()} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </DialogContentContainerSection>
        <DialogContentContainerSection>
          <TextField multiline minRows={6} label="Description" />
        </DialogContentContainerSection>
      </DialogContentContainer>
      <Divider />
      <DialogActions>
        <Button color="error">Cancel</Button>
        <Button>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewStreamer;
