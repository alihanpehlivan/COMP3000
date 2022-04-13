import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const baseColorTheme = createTheme({
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

const componentTheme = createTheme(
  {
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          ul: {
            margin: 0,
            padding: 0,
            listStyle: 'none',
          },
        },
      },
      MuiLink: {
        defaultProps: {
          underline: 'none',
          textTransform: 'initial',
        },
        styleOverrides: {
          root: {
            ':hover': {
              color: baseColorTheme.palette.text.secondary,
            },
          },
        },
      },
    },
  },
  baseColorTheme
);

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const AppThemeProvider = ({
  children,
}: ThemeProviderProps): React.ReactElement => {
  return (
    <ThemeProvider theme={componentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};
