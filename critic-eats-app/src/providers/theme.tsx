import { ThemeProvider } from '@emotion/react/';
import CssBaseline from '@mui/material/CssBaseline';
import createTheme from '@mui/material/styles/createTheme';

const currentTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#efbb35',
    },
    secondary: {
      main: '#e84279',
    },
    background: {
      default: '#222831',
      paper: '#181C22',
    },
    text: {
      primary: '#F9FFEE',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen-Sans',
      'Ubuntu',
      'Cantarell',
      'Helvetica Neue',
      'sans-serif',
    ].join(','),
  },
});

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider = ({
  children,
}: ThemeProviderProps): React.ReactElement => {
  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
