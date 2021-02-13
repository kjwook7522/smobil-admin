import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'common/store';
import Header from 'components/organisms/Header/Header';
import CategoryList from 'components/organisms/CategoryList/CategoryList';
import Trunk from 'components/organisms/Trunk/Trunk';
import './Home.css';

const Home: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const { uid, displayName } = user;

  return (
    <div id="home">
      <Header displayName={displayName} />
      <CategoryList />
      <Trunk uid={uid} />
    </div>
  );
};

export default Home;
