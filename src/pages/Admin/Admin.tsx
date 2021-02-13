import React from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from './components';
import AdminAuthDeny from 'pages/AdminAuthDeny/AdminAuthDeny';
import './Admin.css';
import { storeService } from 'firebaseApp';

const Admin: React.FC = () => {
  const history = useHistory();
  storeService.collection('admins');
  const isAdmin = false;

  return <>{isAdmin ? <AdminUser replace={history.replace} /> : <AdminAuthDeny />}</>;
};

export default Admin;
