import React from "react";
import { AdminUser, AccessError } from "./components";
import "./Admin.css";

function Admin({ history }) {
  const adminIDs = [
    "112235566169579065470",
    "107046323388850321793",
    "109489316542259397263",
    "110821117138985067502",
    "111773834619407319967",
    "101850832676867603461",
    "111311172782221623775",
    "107254155706958269718",
    "106854856449495551254",
  ];
  const userID = localStorage.getItem("userId");
  let isAdmin = false;

  adminIDs.forEach(adminID => {
    if (adminID === userID) isAdmin = true;
  })

  return <>{isAdmin ? <AdminUser replace={history.replace} /> : <AccessError replace={history.replace} />}</>;
}

export default Admin;