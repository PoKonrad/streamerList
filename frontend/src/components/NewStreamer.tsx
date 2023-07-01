import { Close } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
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
import { useContext, useState } from "react";
import { ModalContext } from "../pages/Index";
import { useMutation } from "react-query";
import { StreamerBody } from "../types";
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
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    platform: "twitch",
  });
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const { modalOpen, setModalOpen } = useContext(ModalContext);

  const { mutate, isLoading } = useMutation({
    mutationFn: (body: StreamerBody) => {
      return fetch(`/api/streamers`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((resp) => resp.json());
    },
  });

  const handleSubmit = () => {
    mutate(formData);
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Dialog open={modalOpen} maxWidth="lg" fullWidth onClose={closeModal}>
      <DialogTitle>
        Add your favorite streamer
        <IconButton
          sx={{ position: "absolute", right: 8, top: 8 }}
          onClick={closeModal}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContentContainer>
        <DialogContentContainerSection>
          <TextField
            label="Streamer Name"
            name="name"
            onChange={handleInputChange}
          />
          <Select
            label="Platform"
            name="platform"
            value={formData.platform}
            onChange={handleInputChange}
          >
            {platforms.map((el) => (
              <MenuItem value={el.toLowerCase()} key={el}>
                {el}
              </MenuItem>
            ))}
          </Select>
        </DialogContentContainerSection>
        <DialogContentContainerSection>
          <TextField
            multiline
            minRows={6}
            label="Description"
            name="description"
            onChange={handleInputChange}
          />
        </DialogContentContainerSection>
      </DialogContentContainer>
      <Divider />
      <DialogActions>
        <Button color="error" onClick={() => setModalOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {isLoading ? <CircularProgress /> : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NewStreamer;
