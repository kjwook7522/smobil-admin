import React from 'react';
import { useHistory } from 'react-router-dom';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import './AdminAuthDeny.css';

const AdminAuthDeny: React.FC = () => {
  const history = useHistory();
  const goHome = () => {
    history.replace('/');
  };

  return (
    <section id="admin-auth-deny">
      <div className="warning-box">
        <IoMdCloseCircleOutline />
        <p>관리자가 아닙니다. 접근하시려면 관리자로 로그인 하시거나 관리자에게 문의해주십시오.</p>
        <button onClick={goHome}>돌아가기</button>
      </div>
    </section>
  );
};

export default AdminAuthDeny;
