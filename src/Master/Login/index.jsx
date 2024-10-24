import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../features/userSlice'; 
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .email('Invalid email format')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleLogin = (values, { setSubmitting }) => {
    dispatch(loginUser(values))
      .then(() => {
        navigate('/home'); 
      })
      .catch((error) => {
        console.error('Login failed:', error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-8 col-md-6 mx-auto">
          <div className="card p-4 shadow">
            <h2 className="text-center">Login</h2>
            <Formik
              initialValues={{ username: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="needs-validation">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="username"
                      placeholder="Enter your email"
                    />
                    <ErrorMessage name="email" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <Field
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage name="password" component="div" className="text-danger" />
                  </div>

                  <button type="submit" className="btn btn-primary w-100" disabled={isSubmitting}>
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
