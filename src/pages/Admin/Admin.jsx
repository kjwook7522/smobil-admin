import React from "react";
import { AdminUser, AccessError } from "./components";
import "./Admin.css";

function Admin({ history }) {
  const adminID = "112235566169579065470";
  const userID = localStorage.getItem("userId");
  return <div>{adminID === userID ? <AdminUser replace={history.replace} /> : <AccessError replace={history.replace} />}</div>;
}

export default Admin;