import HowToRegIcon from '@mui/icons-material/HowToReg';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import { useEffect } from 'react';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import { createUser } from '@/features/user';
import { auth } from '@/providers/firebase';

interface RegisterCredentialsDTO {
  email: string;
  password: string;
}

export const Register = () => {
  const [createUserWithEmailAndPassword, authUser, authLoading, authError] =
    useCreateUserWithEmailAndPassword(auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    //reset,
  } = useForm<RegisterCredentialsDTO>({
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
      // Set initial profile information
      const initUser = async () => {
        await createUser(authUser.user.uid);
      };

      initUser()
        .then(() => {
          enqueueSnackbar('Welcome to CriticEats!', {
            variant: 'success',
          });
          navigate('/app');
        })
        .catch((error) => {
          // NOTE: I should probably implement some kind of rollback
          // or use transactions?
          enqueueSnackbar('User registration failed with: ' + error.code, {
            variant: 'error',
          });
        });
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
        <HowToRegIcon fontSize="large" />

        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <Box
          component="form"
          sx={{ mt: 1 }}
          noValidate
          onSubmit={handleSubmit((dto: RegisterCredentialsDTO) =>
            createUserWithEmailAndPassword(dto.email, dto.password)
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
            label="Email Address"
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
            label="Password"
            type="password"
            autoComplete="password"
          />

          <LoadingButton
            fullWidth
            loading={authLoading}
            type="submit"
            color="primary"
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign up
          </LoadingButton>

          <Divider variant="middle">
            <Chip label="Already on CriticEats?" />
          </Divider>

          <Button
            component={RouterLink}
            to={'//auth/login'}
            fullWidth
            color="primary"
            variant="outlined"
            sx={{ mt: 3 }}
          >
            Sign in
          </Button>
        </Box>
      </Box>
    </Container>
  );
};
