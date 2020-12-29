import React from 'react';
import { useState } from 'react';
import { AdminMenu, Drivers, Storage, New, Manage, SalesLog } from '../../components';
import { categoryStruct } from 'common';
import './AdminUser.css';

function AdminUser({ replace }) {
  const [category, setCategory] = useState({ ...categoryStruct, menu: true });

  return (
    <section id="admin">
      {category.menu && <AdminMenu replace={replace} setCategory={setCategory} />}
      {category.drivers && <Drivers setCategory={setCategory} />}
      {category.storage && <Storage setCategory={setCategory} />}
      {category.new && <New setCategory={setCategory} />}
      {category.manage && <Manage setCategory={setCategory} />}
      {category.log && <SalesLog setCategory={setCategory} />}
    </section>
  );
}

export default AdminUser;
