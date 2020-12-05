/* eslint-disable react/forbid-prop-types */
/* eslint-disable no-underscore-dangle */
/* eslint-disable import/no-unresolved */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import moment from 'moment';

import { getCommentByArticleId } from 'components/api/commentApi';
import { Card, CardBody, CardText, CardTitle } from 'reactstrap';
import ArticleInput from 'components/ArticleInput';

const Article = ({ article }) => {
  const [comments, setComments] = useState([]);
  const { userId: currentUser } = article;

  const fetchData = async () => {
    try {
      const { status, data, error } = await getCommentByArticleId(article._id);

      if (status === 'failed' && error) {
        throw new Error(error.message);
      }

      if (status === 'success' && data) {
        const { comments: currentComments } = data;

        if (!currentComments) {
          throw new Error('Có lỗi xảy ra');
        }

        setComments(() => currentComments);
      }

      return true;
    } catch (error) {
      return console.log(error.message);
    }
  };

  const handleSubmit = (comment) => {
    setComments((currentComments) => [...currentComments, comment]);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">{currentUser.name}</CardTitle>
      </CardBody>
      <img width="100%" src={article.img} alt="Card image cap" />
      <CardBody>
        <CardText>{article.text}</CardText>
        <ul>
          {comments.map((item) => (
            <li key={item._id}>
              <p color="primary">
                {item.text}
                <span>{moment(item.dateCreate).fromNow()}</span>
              </p>
            </li>
          ))}
        </ul>
        <ArticleInput articleId={article._id} onSubmit={handleSubmit} />
      </CardBody>
    </Card>
  );
};

Article.propTypes = {
  article: PropTypes.object.isRequired,
};

export default Article;
