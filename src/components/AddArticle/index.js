/* eslint-disable import/no-unresolved */
import InputField from 'components/custom-fields/InputField';
import { FastField, Formik, Form } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, FormGroup } from 'reactstrap';
import * as yup from 'yup';
import { addArticle } from 'resources/articles/articleSlide';
import { createArticle } from 'components/api/articleApi';

const AddArticle = () => {
  const dispatch = useDispatch();

  const initialValues = {
    status: '',
    image: {},
  };

  const validationSchema = yup.object().shape({
    status: yup.string().required('Bạn phải nhập cảm nghĩ của mình'),
    image: yup.object().nullable(),
  });

  const fetchData = async (formData) => {
    try {
      const { status, data, error } = await createArticle(formData);
      // debugger;
      if (status === 'failed' && error) {
        throw new Error(error.message);
      }

      if (status === 'success' && data) {
        const { message, article } = data;

        if (!message || !article) {
          throw new Error('Có lỗi xảy ra');
        }

        dispatch(addArticle(article));
      }

      return true;
    } catch (error) {
      return console.log(error);
    }
  };

  const handleSubmit = ({ status, image }) => {
    const form = new FormData();
    form.append('text', status);
    form.append('img', image);

    fetchData(form);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={validationSchema}
    >
      {(formikProps) => {
        return (
          <Form>
            <FastField
              name="status"
              type="text"
              component={InputField}
              label="Trạng thái"
              placeholder="Nhập trạng thái của bạn..."
            />

            <FastField
              type="file"
              label="Chọn ảnh"
              name="image"
              component={InputField}
            />

            <FormGroup>
              <Button type="submit" color="primary">
                Đăng
              </Button>
            </FormGroup>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddArticle;
