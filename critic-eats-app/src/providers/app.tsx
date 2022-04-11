import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter as Router } from 'react-router-dom';

import { queryClient } from '@/lib/react-query';

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <Button
        className="mt-4"
        onClick={() => window.location.assign(window.location.origin)}
      >
        Refresh
      </Button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        minWidth: '100vw',
      }}
    >
      <CircularProgress size={100} />
    </Box>
  );
};

//export const AppProvider = ({ children }: AppProviderProps) => {
//  return (
//    <React.Suspense
//      fallback={
//        <div className="flex items-center justify-center w-screen h-screen">
//          {/* SPINNER HERE ... */}
//        </div>
//      }
//    >
//      <ErrorBoundary FallbackComponent={ErrorFallback}>
//        <HelmetProvider>
//          <QueryClientProvider client={queryClient}>
//            {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
//            <Router>{children}</Router>
//            {/* <Notifications />
//              <AuthProvider>
//                <Router>{children}</Router>
//              </AuthProvider> */}
//          </QueryClientProvider>
//        </HelmetProvider>
//      </ErrorBoundary>
//    </React.Suspense>
//  );
//};
