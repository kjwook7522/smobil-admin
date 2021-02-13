import React from 'react';
import { useHistory } from 'react-router-dom';
import { AdminUser } from './components';
import { storeService } from 'firebaseApp';
import './Admin.css';

const Admin: React.FC = () => {
  const history = useHistory();
  storeService.collection('admins');

  return <AdminUser replace={history.replace} />;
};

export default Admin;
