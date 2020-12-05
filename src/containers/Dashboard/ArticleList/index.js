/* eslint-disable import/no-unresolved */
/* eslint-disable no-underscore-dangle */
import Article from 'components/Article';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addArticles } from 'resources/articles/articleSlide';
import { getArticles } from 'components/api/articleApi';

const ArticleList = () => {
  const { articles } = useSelector((state) => state.article);
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const { status, data, error } = await getArticles();
      // debugger;
      if (status === 'failed' && error) {
        throw new Error(error.message);
      }

      if (status === 'success' && data) {
        const { articles: currentArticles } = data;

        if (!currentArticles) {
          throw new Error('Có lỗi xảy ra');
        }

        dispatch(addArticles(currentArticles));
      }
      return true;
    } catch (error) {
      return console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <ul>
      {articles.map((item) => (
        <Article key={item._id} article={item} />
      ))}
    </ul>
  );
};

export default ArticleList;
