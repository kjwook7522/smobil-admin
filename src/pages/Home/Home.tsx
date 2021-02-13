import React from 'react';
import Header from 'components/organisms/Header/Header';
import CategoryList from 'components/organisms/CategoryList/CategoryList';
import Trunk from 'components/organisms/Trunk/Trunk';
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
