/* eslint-disable no-debugger */
/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import InputField from 'components/custom-fields/InputField';
import { FastField, Formik, Form } from 'formik';
import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import * as yup from 'yup';
import { getToken } from 'components/api/authApi';
import { useDispatch, useSelector } from 'react-redux';
import { addLogin } from 'resources/auths/authSlide';
import { Redirect, useHistory } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { isLogin } = useSelector((state) => state.auth);

  const initialValues = {
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email('Email không hợp lệ')
      .required('Bạn phải nhập email'),
    password: yup
      .string()
      .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
      .max(10, 'Mật khẩu không quá 10 ký tự')
      .required('Bạn phải nhập mật khẩu'),
  });

  const handleSubmit = async (values) => {
    try {
      const { status, data, error } = await getToken(values);
      // debugger;
      if (status === 'failed' && error) {
        throw new Error(error.message);
      }

      if (status === 'success' && data) {
        const { token, user } = data;

        if (!token || !user) {
          throw new Error('Có lỗi xảy ra');
        }

        localStorage.setItem('token', token);
        dispatch(addLogin(user));
        history.push('/main');
      }

      return true;
    } catch (error) {
      return console.log(error.message);
    }
  };

  return !isLogin ? (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {(formikProps) => {
          return (
            <Form>
              <FastField
                name="email"
                component={InputField}
                label="Email"
                placeholder="Nhập email của bạn..."
              />
              <FastField
                name="password"
                type="password"
                component={InputField}
                label="Mật khẩu"
                placeholder="Nhập mật khẩu của bạn..."
              />
              <FormGroup>
                <Button color="primary" type="submit">
                  Đăng nhập
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  ) : (
    <Redirect from="/login" to="/main" />
    // <h1>Logined</h1>
  );
};

export default Login;
