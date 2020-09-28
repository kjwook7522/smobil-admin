import React from "react";
import "./Rel.css";

function Rel() {
  const handleSignoutClick = () => {
    window.gapi.auth2.getAuthInstance().signOut();
  }
  return (
    <>
      <button onClick={handleSignoutClick}>logout</button>
    </>
  );
}

export default Rel;
