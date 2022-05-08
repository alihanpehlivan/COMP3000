import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

import { ErrorFallback, LoadingFallback } from '@/features/misc';
import { NotificationProvider } from '@/providers/notistack';
import { AppThemeProvider } from '@/providers/theme';

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={LoadingFallback()}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppThemeProvider>
          <HelmetProvider>
            <NotificationProvider>
              <BrowserRouter>{children}</BrowserRouter>
            </NotificationProvider>
          </HelmetProvider>
        </AppThemeProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
