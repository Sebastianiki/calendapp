import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import {
  Avatar,
  CssBaseline,
  Box,
  Typography,
  Container,
  Divider,
  Grid,
} from '@mui/material';
import Textfield from '../ui/forms/Textfield';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { authLogin, authRegister } from '../../actions/auth';
import SubmitButton from '../ui/forms/SubmitButton';

export const LoginScreen = () => {

  const { loginValidation, registerValidation } = useSelector( state => state.auth )
  
  const dispatch = useDispatch();

  const handleLogin = ({ lEmail, lPassword }) => {
    dispatch( authLogin(lEmail, lPassword) );
  }

  const handleRegister = ({ rName, rEmail, rPassword }) => {
    dispatch( authRegister(rName, rEmail, rPassword) );
  }

  const initialLoginFormState = {
    lEmail: '',
    lPassword: ''
  }

  const loginFormValidation = Yup.object().shape({
    lEmail: Yup.string()
      .required('Required')
      .email('Email invalid'),
    lPassword: Yup.string()
      .required('Required'),
  });

  const initialRegisterFormState = {
    rName: '',
    rEmail: '',
    rPassword: '',
    rConfirmPassword: ''
  }

  const registerFormValidation = Yup.object().shape({
    rName: Yup.string()
      .required('Required'),
    rEmail: Yup.string()
      .required('Required')
      .email('Email invalid'),
    rPassword: Yup.string()
      .required('Required')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    rConfirmPassword: Yup.string()
      .required('Required')
      .oneOf([Yup.ref("rPassword"), null], "Passwords must match")
  });
  
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
            <Typography component="h1" variant="h5" sx={{ mb: 5}}>
              INGRESO
            </Typography>
            <Formik
              initialValues={{...initialLoginFormState}}
              validationSchema={loginFormValidation}
              onSubmit={values => {handleLogin(values)}}
            >
              <Form>
                <Textfield
                  name='lEmail'
                  label='Email'
                  type='email'
                  error={loginValidation.error}
                />
                <Textfield
                  name='lPassword'
                  label='Password'
                  type='password'
                  error={loginValidation.error}
                  helperText={loginValidation.msg}
                />
                <SubmitButton sx={{ mt: 2 }}>INICIAR SESION</SubmitButton>
              </Form>
            </Formik>
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
            <Typography component="h1" variant="h5" sx={{ mb: 5}}>
              REGISTRO
            </Typography>
            <Formik
              initialValues={{...initialRegisterFormState}}
              validationSchema={registerFormValidation}
              onSubmit={values => handleRegister(values) }
            >
              <Form>
                <Textfield
                  name='rName'
                  label='Name'
                />
                <Textfield
                  name='rEmail'
                  label='Email'
                  type='email'
                  error={ registerValidation.error }
                  helperText={ registerValidation.msg }
                />
                <Textfield
                  name='rPassword'
                  label='Password'
                  type='password'
                />
                <Textfield
                  name='rConfirmPassword'
                  label='Confirm password'
                  type='password'
                />
                <SubmitButton sx={{ mt: 2 }}>REGISTRARSE</SubmitButton>
              </Form>
            </Formik>
          </Box>
        </Grid>
      </Grid>
      </Container>
  );
}
