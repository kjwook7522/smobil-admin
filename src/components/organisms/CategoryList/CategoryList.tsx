import React from 'react';
import { Link } from 'react-router-dom';
import { FaBatteryHalf } from 'react-icons/fa';
import { RiOilLine } from 'react-icons/ri';
import { BiTachometer, BiDotsHorizontalRounded, BiWater } from 'react-icons/bi';
import { IoIosWater } from 'react-icons/io';
import { FiWind } from 'react-icons/fi';
import { MdLocalCarWash } from 'react-icons/md';
import { CgKeyboard } from 'react-icons/cg';
import './CategoryList.css';

const CategoryList: React.FC = () => {
  return (
    <section id="category-list">
      <div className="category-wrapper">
        <div className="item">
          <Link to="/category/battery">
            <FaBatteryHalf />
            <p>배터리</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/oil">
            <RiOilLine />
            <p>오일</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/oilfilter">
            <IoIosWater />
            <p>오일필터</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/airfilter">
            <FiWind />
            <p>에어필터</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/wiper">
            <BiTachometer />
            <p>와이퍼</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/washer">
            <MdLocalCarWash />
            <p>워셔액</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/pad">
            <CgKeyboard />
            <p>패드</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/aircon">
            <BiWater />
            <p>에어컨필터</p>
          </Link>
        </div>

        <div className="item">
          <Link to="/category/etc">
            <BiDotsHorizontalRounded />
            <p>기타</p>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryList;
