import React from 'react';
import { makeStyles, Card, CardMedia, CardContent, Box } from '@material-ui/core';
import { Formik } from 'formik';
import { useLoginService } from '../../services/loginService';
import logo from '../../assets/images/logo.svg';
import './login.scss'

const useStyles = makeStyles({
  card: {
    maxWidth: 345,
    margin: 'auto',
    border: '1px solid #ddd',
    boxShadow: 'none',
  },
  media: {
    height: 140,
    backgroundColor: '#171717',
    backgroundSize: 'contain',
  }
});

const LoginForm = () => {
  const classes = useStyles();
  const [loginMutation, { loading, data, error }] = useLoginService();

  if (data) {
    // 
  }
  const disableForm = loading;

  const onSubmit = (values) => loginMutation(values.email, values.password);

  const initialValues = {
    email: '',
    password: ''
  };

  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!regex.test(values.email)) {
      errors.email = 'Invalid Email';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (values.password.length < 4) {
      errors.password = 'Password too short';
    }

    return errors;
  };

  return (
    <Box pt={5}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={logo}
          title='Rollinow'
        />
        <CardContent>

          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={onSubmit}
          >
            {(formik) => {
              const {
                values,
                handleChange,
                handleSubmit,
                errors,
                touched,
                handleBlur,
                isValid,
                dirty
              } = formik;
              return (
                <div className='container'>
                  <h1>Welcome admin</h1>
                  <form onSubmit={handleSubmit}>
                    <div className='form-row'>
                      <label htmlFor='email'>Email</label>
                      <input
                        type='email'
                        name='email'
                        id='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.email && touched.email ? 'input-error' : null
                        }
                      />
                      {errors.email && touched.email && (
                        <span className='error'>{errors.email}</span>
                      )}
                    </div>

                    <div className='form-row'>
                      <label htmlFor='password'>Password</label>
                      <input
                        type='password'
                        name='password'
                        id='password'
                        value={values.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={
                          errors.password && touched.password ? 'input-error' : null
                        }
                      />
                      {errors.password && touched.password && (
                        <span className='error'>{errors.password}</span>
                      )}
                    </div>
                    {error && <div className='form-row'>
                      <span className='error'>{error.message}</span>
                    </div>}
                    <button
                      type='submit'
                      className={!(dirty && isValid) ? 'disabled-btn' : ''}
                      disabled={!(dirty && isValid) || disableForm}
                    >
                      Sign In
              </button>
                  </form>
                </div>
              );
            }}
          </Formik>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginForm;