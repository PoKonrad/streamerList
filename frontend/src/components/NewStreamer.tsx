import { Close } from '@mui/icons-material';
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
  styled
} from '@mui/material';
import { useContext, useEffect } from 'react';
import { FormDialogContext } from '../pages/Index';
import { useMutation } from 'react-query';
import { StreamerBody } from '../types';
import { object, string } from 'yup';
import { useFormik } from 'formik';
import apiClient from '../apiClient';
import { AxiosError } from 'axios';
import { useNotification } from '../hooks/useNotifaction';
const platforms = ['Twitch', 'YouTube', 'TikTok', 'Kick', 'Rumble'];

const DialogContentContainer = styled(DialogContent)({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between'
});

const DialogContentContainerSection = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  justifyContent: 'space-between',
  margin: '2rem'
});

const FormContainer = styled('form')({
  '*': 'inherit'
});

const streamerSchema = object({
  name: string().required().max(30).min(2),
  description: string().required().max(500)
});

const NewStreamer = () => {
  const { formDialogOpen, setFormDialogOpen } = useContext(FormDialogContext);
  const { successNotification, errorNotification } = useNotification();

  const { mutate, isLoading, isError, error, isSuccess } = useMutation({
    mutationFn: (body: StreamerBody) => {
      return apiClient.post(`/streamers`, body);
    }
  });

  const handleSend = () => {
    mutate(values);
    closeModal();
  };

  const closeModal = () => {
    setFormDialogOpen(false);
  };

  const { values, handleChange, handleSubmit, errors } = useFormik({
    initialValues: {
      name: '',
      description: '',
      platform: 'twitch'
    },
    validationSchema: streamerSchema,
    onSubmit: () => handleSend()
  });

  useEffect(() => {
    if (isSuccess) {
      successNotification(`Streamer successfully added!`);
    }
    if (isError) {
      errorNotification(`An error has occured: ${(error as AxiosError).message}`);
    }
  }, [isSuccess, isError]);

  return (
    <Dialog open={formDialogOpen} maxWidth="lg" fullWidth onClose={closeModal}>
      <DialogTitle>
        Add your favorite streamer
        <IconButton sx={{ position: 'absolute', right: 8, top: 8 }} onClick={closeModal}>
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
            <Select name="platform" defaultValue="twitch" onChange={handleChange}>
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
          <Button color="error" onClick={() => setFormDialogOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">{isLoading ? <CircularProgress /> : 'Save'}</Button>
        </DialogActions>
      </FormContainer>
    </Dialog>
  );
};

export default NewStreamer;
