/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, Input } from 'reactstrap';

import { createComment } from 'components/api/commentApi';

const ArticleInput = ({ articleId, onSubmit }) => {
  const [comment, setComment] = useState('');

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    try {
      const { status, data, error } = await createComment({
        comment,
        articleId,
      });
      // debugger;
      if (status === 'failed' && error) {
        throw new Error(error.message);
      }

      if (status === 'success' && data) {
        const { message, comment: currentComment } = data;

        if (!message || !currentComment) {
          throw new Error('Có lỗi xảy ra');
        }

        onSubmit(currentComment);
        setComment('');
      }

      return true;
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        multiple
        placeholder="Nhập comment của bạn..."
        value={comment}
        onChange={(evt) => setComment(() => evt.target.value)}
      />
      <Button outline="primary" type="submit" onClick={handleSubmit}>
        Thêm
      </Button>
    </Form>
  );
};

ArticleInput.propTypes = {
  articleId: PropTypes.string,
  onSubmit: PropTypes.func,
};

ArticleInput.defaultProps = {
  articleId: '',
  onSubmit: null,
};

export default ArticleInput;
