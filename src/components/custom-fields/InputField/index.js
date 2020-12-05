/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import { FormFeedback, FormGroup, Input, Label } from 'reactstrap';
import { ErrorMessage } from 'formik';

const InputField = (props) => {
  const { field, form, label, type, placeholder, disabled } = props;
  const { name, value, onChange, onBlur } = field;

  const { errors, touched } = form;
  const showError = errors[name] && touched[name];

  const handleChangeImage = (evt) => {
    const file = evt.target.files[0];
    form.setFieldValue(name, file);
  };

  return (
    <FormGroup>
      <Label for={name}>{label}</Label>
      <Input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
        {...field}
        value={type === 'file' ? null : value}
        onChange={type === 'file' ? handleChangeImage : onChange}
        invalid={showError}
      />

      <ErrorMessage name={name} component={FormFeedback} />
    </FormGroup>
  );
};

InputField.propTypes = {
  field: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,

  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
};

InputField.defaultProps = {
  label: '',
  type: 'text',
  placeholder: '',
  disabled: false,
};

export default InputField;
