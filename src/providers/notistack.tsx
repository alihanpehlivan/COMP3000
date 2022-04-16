import { SnackbarProvider } from 'notistack';

interface NotificationProviderProps {
  children: React.ReactNode;
}

export const NotificationProvider = ({
  children,
}: NotificationProviderProps): React.ReactElement => {
  return (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      maxSnack={3}
      preventDuplicate={true}
      autoHideDuration={3000}
    >
      {children}
    </SnackbarProvider>
  );
};
