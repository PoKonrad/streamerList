import { useContext } from 'react';
import { SnackbarContext } from '../main';

export const useNotification = () => {
  const { setSnackbarOpen } = useContext(SnackbarContext);

  const errorNotification = (message: string) => {
    setSnackbarOpen({
      alertType: 'error',
      isOpen: true,
      text: message
    });
  };
  const infoNotification = (message: string) => {
    setSnackbarOpen({
      alertType: 'info',
      isOpen: true,
      text: message
    });
  };
  const successNotification = (message: string) => {
    setSnackbarOpen({
      alertType: 'success',
      isOpen: true,
      text: message
    });
  };
  const warningNotification = (message: string) => {
    setSnackbarOpen({
      alertType: 'warning',
      isOpen: true,
      text: message
    });
  };

  return {
    errorNotification,
    infoNotification,
    successNotification,
    warningNotification
  };
};
