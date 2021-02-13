import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authService, DocumentData, storeService } from 'firebaseApp';
import { adminConfirm, adminReject, driverConfirm, initUser } from 'actions/user';
import { loginOff, loginOn } from 'actions/login';
import { loadingOff, loadingOn } from 'actions/loading';
import { RootState } from 'common/store';
import { Loading } from 'common';
import AppRouter from 'Router';
// import { driverConfirm } from 'actions/driver';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const history = useHistory();
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
        const userObj: User = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
        };

        dispatch(initUser(userObj));
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
      const driver = collection.docs.find(item => uid === item.data()?.uid);
      if (driver) {
        dispatch(driverConfirm());
        checkAdmins(driver.data());
      }
    } catch (error) {
      console.error(error);
      alert('데이터를 가져오는데 실패했습니다');
    }
  };

  const checkAdmins = (driver: DocumentData) => {
    if (driver.admin) {
      dispatch(adminConfirm());
    } else {
      dispatch(adminReject());
    }
  };

  return <div className="App">{isLoading ? <Loading /> : <AppRouter />}</div>;
};

export default App;
