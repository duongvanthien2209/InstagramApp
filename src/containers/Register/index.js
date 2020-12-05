/* eslint-disable no-console */
/* eslint-disable import/no-unresolved */
import InputField from 'components/custom-fields/InputField';
import { FastField, Formik, Form } from 'formik';
import React from 'react';
import { FormGroup, Button } from 'reactstrap';
import * as yup from 'yup';
import { register } from 'components/api/authApi';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Register = () => {
  const history = useHistory();
  const { isLogin } = useSelector((state) => state.auth);

  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required('Bạn phải nhập tên'),
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
      const { status, data, error } = await register(values);

      if (status === 'failed' && error) {
        throw new Error(error.message);
      }

      if (status === 'success' && data) {
        const { message } = data;

        if (!message) {
          throw new Error('Có lỗi xảy ra');
        }

        console.log(message);
        history.push('/login');
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
                name="name"
                component={InputField}
                label="Tên"
                placeholder="Nhập tên của bạn..."
              />
              <FastField
                name="email"
                component={InputField}
                label="Email"
                placeholder="Nhập email của bạn..."
              />
              <FastField
                name="password"
                component={InputField}
                label="Mật khẩu"
                type="password"
                placeholder="Nhập mật khẩu của bạn..."
              />
              <FormGroup>
                <Button color="primary" type="submit">
                  Đăng ký
                </Button>
              </FormGroup>
            </Form>
          );
        }}
      </Formik>
    </div>
  ) : (
    <Redirect from="/register" to="/main" />
    // <h1>Logined</h1>
  );
};

export default Register;
