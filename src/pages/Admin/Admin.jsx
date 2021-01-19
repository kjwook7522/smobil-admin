import React from "react";
import { AdminUser, AccessError } from "./components";
import "./Admin.css";

function Admin({ history }) {
  const adminIDs = ["112235566169579065470", "107046323388850321793", "109489316542259397263"];
  const userID = localStorage.getItem("userId");
  let isAdmin = false;

  adminIDs.forEach(adminID => {
    if (adminID === userID) isAdmin = true;
  })

  return <>{isAdmin ? <AdminUser replace={history.replace} /> : <AccessError replace={history.replace} />}</>;
}

export default Admin;