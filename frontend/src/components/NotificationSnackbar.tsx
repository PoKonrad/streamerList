import { Alert, Snackbar } from "@mui/material";
import { useContext } from "react";
import { SnackbarContext } from "../main";

const NotificationSnackbar = () => {
  const { setSnackbarOpen, snackbarOpen } = useContext(SnackbarContext);
  return (
    <>
      <Snackbar
        open={snackbarOpen.isOpen}
        autoHideDuration={5000}
        onClose={() => setSnackbarOpen({ ...snackbarOpen, isOpen: false })}
      >
        <Alert severity={snackbarOpen.alertType}>{snackbarOpen.text}</Alert>
      </Snackbar>
    </>
  );
};

export default NotificationSnackbar;
