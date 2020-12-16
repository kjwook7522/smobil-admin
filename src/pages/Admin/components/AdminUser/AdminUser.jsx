import React from "react";
import { useState } from "react";
import { AdminMenu, Drivers, Storage, New, Manage } from "../../components";
import "./AdminUser.css";

function AdminUser({ replace }) {
  const categoryStruct = {
    drivers: false,
    storage: false,
    new: false,
    manage: false,
    menu: true,
  }
  const [category, setCategory] = useState(categoryStruct);

  return (
    <section id="admin">
      {category.menu && <AdminMenu replace={replace} setCategory={setCategory} />}
      {category.drivers && <Drivers setCategory={setCategory} />}
      {category.storage && <Storage />}
      {category.new && <New />}
      {category.manage && <Manage />}
    </section>
  );
}

export default AdminUser;
