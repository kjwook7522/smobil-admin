import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService, storeService } from 'firebaseApp';
import { initUser } from 'actions/user';
import { loginOff, loginOn } from 'actions/login';
import { loadingOff, loadingOn } from 'actions/loading';
import { RootState } from 'common/store';
import { Loading } from 'common';
import AppRouter from 'Router';
import { driverConfirm } from 'actions/driver';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.loadingReducer);

  useEffect(() => {
    //******* prevent double tab zoom *******//
    var lastTouchEnd = 0;
    document.documentElement.addEventListener(
      'touchend',
      function (e) {
        var now = new Date().getTime();
        if (now - lastTouchEnd <= 300) {
          e.preventDefault();
        }
        lastTouchEnd = now;
      },
      false
    );
    //****************************************//

    authService.onAuthStateChanged(async user => {
      dispatch(loadingOn());

      if (user) {
        console.log('sign in');
        dispatch(initUser(user));
        dispatch(loginOn());
        await checkDrivers(user.uid);
      } else {
        console.log('sign out');
        dispatch(loginOff());
      }

      dispatch(loadingOff());
    });
  }, []);

  const checkDrivers = async (uid: string) => {
    try {
      const collection = await storeService.collection('drivers').get();
      collection.forEach(item => {
        if (uid === item.data()?.uid) {
          dispatch(driverConfirm());
        }
      });
    } catch (error) {
      console.error(error);
      alert('데이터를 가져오는데 실패했습니다');
    }
  };

  return <div className="App">{isLoading ? <Loading /> : <AppRouter />}</div>;
};

export default App;
