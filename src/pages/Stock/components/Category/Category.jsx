import React from "react";
import { FaBatteryHalf } from "react-icons/fa";
import { RiOilLine } from "react-icons/ri";
import { BiTachometer, BiDotsHorizontalRounded, BiWater } from "react-icons/bi";
import { IoIosWater } from "react-icons/io";
import { FiWind } from "react-icons/fi";
import { MdLocalCarWash } from "react-icons/md";
import { CgKeyboard } from "react-icons/cg";
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
        <div className="item" id="oil-filter" onClick={changeCategory}>
          <IoIosWater />
          <p>오일필터</p>
        </div>
        <div className="item" id="air-filter" onClick={changeCategory}>
          <FiWind />
          <p>에어필터</p>
        </div>
        <div className="item" id="wiper" onClick={changeCategory}>
          <BiTachometer />
          <p>와이퍼</p>
        </div>
        <div className="item" id="washer" onClick={changeCategory}>
          <MdLocalCarWash />
          <p>워셔액</p>
        </div>
        <div className="item" id="pad" onClick={changeCategory}>
          <CgKeyboard />
          <p>패드</p>
        </div>
        <div className="item" id="aircon" onClick={changeCategory}>
          <BiWater />
          <p>에어컨필터</p>
        </div>
        <div className="item" id="etc" onClick={changeCategory}>
          <BiDotsHorizontalRounded />
          <p>기타</p>
        </div>
      </div>
    </section>
  );
}

export default Category;
