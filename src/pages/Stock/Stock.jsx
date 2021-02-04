import React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { initPart } from 'actions';
import { Header, Category, Cart, Part } from './components';
import { getSheetValues } from 'common';
import './Stock.css';

function Stock({ initList }) {
  const [category, setCategory] = useState('');

  useEffect(() => {
    // initList();
  }, [initList]);

  return (
    <div id="stock">
      {category ? <></> : <Header />}
      {category ? <Part category={category} setCategory={setCategory} /> : <Category setCategory={setCategory} />}
      {/* <Cart /> */}
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    initList: () => {
      const sheetname = 'storage';

      getSheetValues(`${sheetname}!A2:D`).then(
        response => {
          dispatch(initPart(response.result.values));
        },
        reason => {
          console.log(reason.result.error.message);
        }
      );
    },
  };
}

export default connect(null, mapDispatchToProps)(Stock);
