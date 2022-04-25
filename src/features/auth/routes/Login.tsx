import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { auth } from '@/providers/firebase';

interface LoginCredentialsDTO {
  email: string;
  password: string;
}

export const Login = () => {
  const [signInWithEmailAndPassword, authUser, authLoading, authError] =
    useSignInWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //reset,
  } = useForm<LoginCredentialsDTO>({
    defaultValues: { email: '', password: '' },
  });

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (authError) {
      enqueueSnackbar(authError.message, {
        variant: 'error',
      });
    } else if (authUser) {
      enqueueSnackbar('Welcome to CriticEats!', {
        variant: 'success',
      });
      navigate('/app/welcome');
    }
  }, [authUser, authError]);

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        marginTop: '4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <LockOutlinedIcon fontSize="large" />

        <Typography component="h1" variant="h5">
          Sign In
        </Typography>

        <Box
          component="form"
          sx={{ mt: 1 }}
          noValidate
          onSubmit={handleSubmit((dto: LoginCredentialsDTO) =>
            signInWithEmailAndPassword(dto.email, dto.password)
          )}
        >
          <TextField
            {...register('email', {
              required: 'This is required.',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'This is not a valid e-mail format.',
              },
            })}
            error={!!errors.email?.message}
            helperText={errors.email ? errors.email.message : ''}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
          />

          <TextField
            {...register('password', {
              required: 'This is required.',
              // TODO: Preferably use regex to match some sort of password strength.
              minLength: { value: 6, message: 'Password is too short.' },
            })}
            error={!!errors.password?.message}
            helperText={errors.password ? errors.password.message : ''}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="password"
          />

          <Grid container sx={{ flexDirection: 'row', alignItems: 'center' }}>
            <Grid item xs>
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            </Grid>
            <Grid item>
              <Link
                onClick={() =>
                  enqueueSnackbar('This feature is not implemented.', {
                    variant: 'error',
                  })
                }
                href="#"
                variant="button"
              >
                Forgot password?
              </Link>
            </Grid>
          </Grid>

          <LoadingButton
            fullWidth
            loading={authLoading}
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign in
          </LoadingButton>

          <Divider variant="middle">
            <Chip label="Not on CriticEats?" />
          </Divider>

          <Button
            component={RouterLink}
            to={'//auth/register'}
            fullWidth
            color="primary"
            variant="outlined"
            sx={{ mt: 3 }}
          >
            Sign up
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
