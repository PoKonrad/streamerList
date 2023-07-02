import React, { SetStateAction, createContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Index from './pages/Index.tsx';
import StreamerType from './pages/Streamer.tsx';
import { ThemeProvider, createTheme } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import NotificationSnackbar from './components/NotificationSnackbar.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Index />
  },
  {
    path: '/streamer/:id',
    element: <StreamerType />
  }
]);

const theme = createTheme({
  palette: {
    mode: 'dark'
  }
});

const queryClient = new QueryClient();

interface SnackbarContextInterface {
  snackbarOpen: SnackbarInterface;
  setSnackbarOpen: React.Dispatch<SetStateAction<SnackbarInterface>>;
}

interface SnackbarInterface {
  isOpen: boolean;
  alertType: 'error' | 'warning' | 'info' | 'success';
  text: string;
}

export const SnackbarContext = createContext<SnackbarContextInterface>({
  snackbarOpen: {
    isOpen: false,
    alertType: 'info',
    text: ''
  },
  setSnackbarOpen: () => ''
});

const Main = () => {
  const [snackbarOpen, setSnackbarOpen] = useState<SnackbarInterface>({
    isOpen: false,
    alertType: 'info',
    text: ''
  });
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <SnackbarContext.Provider value={{ snackbarOpen, setSnackbarOpen }}>
            <NotificationSnackbar />
            <RouterProvider router={router} />
          </SnackbarContext.Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div>
      <Main />
    </div>
  </React.StrictMode>
);
