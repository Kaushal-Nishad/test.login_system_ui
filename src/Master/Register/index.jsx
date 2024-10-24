import React from 'react';
import { useDispatch } from 'react-redux';
import { createUser } from '../../features/userSlice';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const handleRegister = (values, { setSubmitting }) => {
    dispatch(createUser(values));
    setSubmitting(false);
    navigate('/');
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-8 col-md-6 mx-auto">
          <div className="card p-4 shadow">
            <h2 className="text-center">Register</h2>
            <Formik
              initialValues={{ name: '', email: '', password: '' }}
              validationSchema={validationSchema}
              onSubmit={handleRegister}
            >
              {({ isSubmitting }) => (
                <Form className="needs-validation">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Enter your name"
                    />
                    <ErrorMessage name="name" component="div" className="text-danger" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <Field
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
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
                    {isSubmitting ? 'Registering...' : 'Register'}
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

export default Register;
