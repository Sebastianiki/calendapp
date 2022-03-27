import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Box,
  Typography,
  Container,
  Divider,
  Grid,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from '../../hooks/useForm'
import { startLogin } from '../../actions/auth';

export const LoginScreen = () => {

  const dispatch = useDispatch();

  const [ formLoginValues, handleLoginInputChange ] = useForm({
    lEmail: 'hola@sebastianreyes.cl',
    lPassword: 'Seba133xd#$'
  });

  const [ formRegisterValues, handleRegisterInputChange ] = useForm({
    rName: 'Sebastian 2',
    rEmail: 'contacto@sebastianreyes.cl',
    rPassword: 'Seba133xd#$',
    rConfirmPassword: 'Seba133xd#$'
  });

  const [errorsRegisterForm, setErrorsRegisterForm] = useState({
    lEmail : { error: false, msg: ''},
    lPassword : { error: false, msg: ''}
  })

  const { lEmail, lPassword } = formLoginValues;
  const { rName, rEmail, rPassword, rConfirmPassword } = formRegisterValues;

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(lEmail.length);
    if(lEmail.length === 0) setErrorsRegisterForm({...errorsRegisterForm, lEmail: { error:true, msg: 'Email obligatorio'}})
    dispatch( startLogin(lEmail, lPassword) );
  }

  const handleRegister = (e) => {
    e.preventDefault();
  }
  
  return (
    <Container component="main">
      <CssBaseline />
      <Grid container alignItems="center" sx={{ height: '100vh'}}>
        <Grid item xs={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              INGRESO
            </Typography>
            <Box component="form" onSubmit={ handleLogin } >
              <TextField
                error= { errorsRegisterForm.lEmail.error }
                helperText= { errorsRegisterForm.lEmail.msg }
                margin="normal"
                fullWidth
                id="lEmail"
                label="Email Address"
                type="email"
                autoFocus
                name="lEmail"
                value={ lEmail }
                onChange= { handleLoginInputChange }
              />
              <TextField
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="lPassword"
                name="lPassword"
                value={ lPassword }
                onChange= { handleLoginInputChange }
              />
              <Button
                type='submit'
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                INICIAR SESION
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Divider orientation="vertical" flexItem sx={{ height: '50vh'}}>
            O
          </Divider>
        </Grid>
        <Grid item xs={5}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              REGISTRO
            </Typography>
            <Box component="form" onSubmit={handleRegister}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="rName"
                label="Name"
                autoFocus
                name="rName"
                value={rName}
                onChange={handleRegisterInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="rEmail"
                label="Email Address"
                type="email"
                autoFocus
                name="rEmail"
                value={rEmail}
                onChange={handleRegisterInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="rPassword"
                label="Password"
                autoFocus
                name="rPassword"
                value={rPassword}
                onChange={handleRegisterInputChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="rConfirmPassword"
                label="Confirm Password"
                autoFocus
                name="rConfirmPassword"
                value={rConfirmPassword}
                onChange={handleRegisterInputChange}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3 }}
              >
                REGISTRARSE
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
      </Container>
  );
}
