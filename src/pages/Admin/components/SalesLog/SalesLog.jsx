import React from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { categoryStruct } from 'common';
import './SalesLog.css';

function SalesLog({ setCategory }) {
  return (
    <section id="sales-log">
      <div className="header">
        <h1>창고 재고 확인</h1>
        <TiArrowBack
          onClick={() => {
            setCategory({ ...categoryStruct, menu: true });
          }}
        />
      </div>
    </section>
  );
}

export default SalesLog;
