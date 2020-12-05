/* eslint-disable import/no-unresolved */
import AddArticle from 'components/AddArticle';
import React from 'react';
import ArticleList from './ArticleList';

const Dashboard = () => {
  return (
    <div>
      <AddArticle />
      <ArticleList />
    </div>
  );
};

export default Dashboard;
