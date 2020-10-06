import React from "react";
import { FaBatteryHalf } from "react-icons/fa";
import { RiOilLine } from "react-icons/ri";
import { AiOutlineTable } from "react-icons/ai";
import { BiTachometer } from "react-icons/bi";
import "./Category.css";

function Category({ setCategory }) {
  const changeCategory = e => {
    setCategory(e.currentTarget.id);
  };
  return (
    <section id="category">
      <div className="category-wrapper">
        <div className="item" id="battery" onClick={changeCategory}>
          <FaBatteryHalf />
          <p>배터리</p>
        </div>
        <div className="item" id="oil" onClick={changeCategory}>
          <RiOilLine />
          <p>오일</p>
        </div>
        <div className="item" id="filter" onClick={changeCategory}>
          <AiOutlineTable />
          <p>필터</p>
        </div>
        <div className="item" id="wiper" onClick={changeCategory}>
          <BiTachometer />
          <p>와이퍼</p>
        </div>
      </div>
    </section>
  );
}

export default Category;
