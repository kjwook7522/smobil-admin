import React from "react";
import { useState } from "react";
import { Header, Category, Cart, Part } from "./components";
import "./Rel.css";

function Rel() {
  const [category, setCategory] = useState("");

  return (
    <div id="rel">
      {category ? <></> : <Header />}
      {category ? <Part category={category} setCategory={setCategory} /> : <Category setCategory={setCategory} />}
      <Cart />
    </div>
  );
}

export default Rel;
