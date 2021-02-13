import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'common/store';
import { authService } from 'firebaseApp';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import './GoogleId.css';

const GoogleId: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer);

  const goHome = () => {
    authService.signOut();
  };

  return (
    <section id="google-id">
      <div className="warning-box">
        <IoMdCloseCircleOutline />
        <h1>안녕하세요 {user.displayName}님.</h1>
        <p>SS-mobility 기사로 등록되지 않아 접근할 수 없습니다. 관리자에게 다음 고유번호를 전달해주세요.</p>
        <h2>{user.uid}</h2>
        <button onClick={goHome}>돌아가기</button>
      </div>
    </section>
  );
};

export default GoogleId;
