import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { authService } from 'firebaseApp';
import { initUser, removeUser } from 'actions/user';
import { Loading } from 'common';
import AppRouter from 'Router';
import { getDriver } from 'common/service/driverService';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

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
      if (user) {
        console.log('sign in');
        const [isDriver, isAdmin] = await checkDrivers(user.uid);
        const userObj: User = {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          isLogin: true,
          isDriver,
          isAdmin,
        };

        dispatch(initUser(userObj));
      } else {
        console.log('sign out');
        dispatch(removeUser());
      }

      // complete all job
      setIsLoading(false);
    });
  }, [dispatch]);

  const checkDrivers = async (uid: string): Promise<[boolean, boolean]> => {
    let isDriver = false;
    let isAdmin = false;

    try {
      const driver = await getDriver(uid);
      if (driver) {
        isDriver = true;
        isAdmin = driver.data().admin;
      }
    } catch (error) {
      console.error(error);
      alert('데이터를 가져오는데 실패했습니다');
    }

    return [isDriver, isAdmin];
  };

  return <div className="App">{isLoading ? <Loading /> : <AppRouter />}</div>;
};

export default App;
