import React from 'react';
import { useState, useEffect } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { categoryStruct, getSheetValues, appendSheetValues, addNewSheet, copyTemplateSheet } from 'common';
import './Manage.css';

function Manage({ setCategory }) {
  const [drivers, setDrivers] = useState([]);
  const [inputs, setInputs] = useState({
    name: '',
    duty: '',
    googleid: '',
  });

  const handleSubmit = e => {
    e.preventDefault();
    addDriver();
  };

  const handleInput = e => {
    const { id, value } = e.target;
    setInputs({ ...inputs, [id]: value });
  };

  const addDriver = async () => {
    const sheetname = 'drivers';
    const values = [[inputs.googleid, inputs.name, inputs.duty]];

    await appendSheetValues(sheetname, values).then(
      response => {
        console.log(`${response.result.updates.updatedCells} cell updated`);
      },
      reason => {
        console.log(reason.result.error.message);
      }
    );

    const result = await addNewSheet(inputs.googleid);
    const newSheetId = result.result.replies[0].addSheet.properties.sheetId;

    await copyTemplateSheet(newSheetId).then(
      response => {
        console.log(response.result);
      },
      reason => {
        console.log(reason.result.error.message);
      }
    );

    alert('기사 추가가 완료되었습니다.');
    window.location.reload();
  };

  useEffect(() => {
    const sheetname = 'drivers';

    getSheetValues(`${sheetname}!A2:C`).then(
      response => {
        setDrivers(response.result.values);
      },
      reason => {
        console.log(reason.result.error.message);
      }
    );
  }, []);

  return (
    <section id="manage">
      <div className="header">
        <h1>기사 관리</h1>
        <TiArrowBack
          onClick={() => {
            setCategory({ ...categoryStruct, menu: true });
          }}
        />
      </div>

      <div className="add-driver">
        <h1>기사 추가</h1>
        <form className="add-driver-form" onSubmit={handleSubmit}>
          <div className="input-box">
            <label htmlFor="name">기사 이름: </label>
            <input id="name" type="text" value={inputs.name} required onChange={handleInput} />
          </div>
          <div className="input-box">
            <label htmlFor="duty">직책: </label>
            <input id="duty" type="text" value={inputs.duty} required onChange={handleInput} />
          </div>
          <div className="input-box">
            <label htmlFor="googleid">고유아이디: </label>
            <input id="googleid" type="text" value={inputs.googleid} required onChange={handleInput} />
          </div>
          <button>추가</button>
        </form>
      </div>

      <div className="driver-list">
        <h1>기사 목록</h1>
        <table>
          <thead>
            <tr>
              <th>이름</th>
              <th>직책</th>
              <th>구글고유번호</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver[0]}>
                <td>{driver[1]}</td>
                <td>{driver[2]}</td>
                <td>{driver[0]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Manage;
