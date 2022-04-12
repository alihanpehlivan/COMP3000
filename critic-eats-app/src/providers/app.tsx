import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { BrowserRouter } from 'react-router-dom';

import { LoadingFallback } from '@/features/misc';
import { ErrorFallback } from '@/features/misc';
import { queryClient } from '@/lib/react-query';
import { AppThemeProvider } from '@/providers/theme';

// Workaround for React V18 with React-Query https://github.com/tannerlinsley/react-query/issues/3476
declare module 'react-query/types/react/QueryClientProvider' {
  interface QueryClientProviderProps {
    children?: React.ReactNode;
  }
}

interface AppProviderProps {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense fallback={LoadingFallback()}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <AppThemeProvider>
          <HelmetProvider>
            <QueryClientProvider client={queryClient}>
              {process.env.NODE_ENV !== 'test' && <ReactQueryDevtools />}
              <BrowserRouter>{children}</BrowserRouter>
              {/*<Notifications />
                <AuthProvider>
                  <BrowserRouter>{children}</BrowserRouter>
                </AuthProvider> */}
            </QueryClientProvider>
          </HelmetProvider>
        </AppThemeProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};
