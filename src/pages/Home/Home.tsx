import React from 'react';
import Header from 'pages/Stock/components/Header/Header';
import CategoryList from 'pages/Stock/components/CategoryList/CategoryList';
import Trunk from 'pages/Stock/components/Trunk/Trunk';
import './Home.css';

const Home: React.FC = () => {
  return (
    <div id="home">
      <Header />
      <CategoryList />
      <Trunk />
    </div>
  );
};

export default Home;
