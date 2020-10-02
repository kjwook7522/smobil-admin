import React from "react";
import { FaBatteryHalf } from "react-icons/fa";
import { RiOilLine } from "react-icons/ri";
import { AiOutlineTable } from "react-icons/ai";
import { BiTachometer } from "react-icons/bi";
import "./Category.css";

function Category() {
  return (
    <section id="category">
      <div className="category-wrapper">
        <div className="item">
          <FaBatteryHalf /><br />
          <p>배터리</p>
        </div>
        <div className="item">
          <RiOilLine />
          <p>오일</p>
        </div>
        <div className="item">
          <AiOutlineTable />
          <p>필터</p>
        </div>
        <div className="item">
          <BiTachometer />
          <p>와이퍼</p>
        </div>
      </div>
    </section>
  );
}

export default Category;
