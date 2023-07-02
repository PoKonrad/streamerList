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
import { useContext } from "react";
import { ModalContext } from "../pages/Index";
import { useMutation } from "react-query";
import { StreamerBody } from "../types";
import { object, string } from "yup";
import { useFormik } from "formik";
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

const FormContainer = styled("form")({
  "*": "inherit",
});

const streamerSchema = object({
  name: string().required().max(30).min(2),
  description: string().required().max(500),
});

const NewStreamer = () => {
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

  const handleSend = () => {
    mutate(values);
    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: "",
      description: "",
      platform: "twitch",
    },
    validationSchema: streamerSchema,
    onSubmit: () => handleSend(),
  });

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
      <FormContainer onSubmit={handleSubmit}>
        <DialogContentContainer>
          <DialogContentContainerSection>
            <TextField
              error={!!errors.name}
              helperText={errors.name}
              label="Streamer Name"
              name="name"
              onChange={handleChange}
            />
            <Select
              label="Platform"
              name="platform"
              defaultValue="twitch"
              onChange={handleChange}
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
              error={!!errors.description}
              helperText={errors.description}
              multiline
              minRows={6}
              label="Description"
              name="description"
              onChange={handleChange}
            />
          </DialogContentContainerSection>
        </DialogContentContainer>
        <Divider />
        <DialogActions>
          <Button color="error" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">
            {isLoading ? <CircularProgress /> : "Save"}
          </Button>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
};

export default NewStreamer;
