import React, { useState } from 'react';
import { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { initCart, minusProd, deleteItem, plusPart } from 'actions';
import { writeLog, getSheetValues } from 'common';
import './Trunk.css';
import { QueryDocumentSnapshot, storeService } from 'firebaseApp';
import { RootState } from 'reducers';
import { minusStorageProd, plusStorageProd } from 'common/service/storageService';
import { minusTrunkProd } from 'common/service/trunkService';

// const Trunk: React.FC = ({ initList, myCart, sell, keep, remove }) => {
const Trunk: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const { uid } = user;
  const [myTrunk, setMyTrunk] = useState<Array<QueryDocumentSnapshot>>([]);

  useEffect(() => {
    // initList();
    listenTrunkList();
  }, []);

  // const keepProd = e => {
  //   const prodId = e.target.parentElement.parentElement.id;
  //   const prodIdx = myCart.findIndex(item => item[0] === prodId);
  //   const fullname = localStorage.getItem('fullname');
  //   const prodCategory = myCart[prodIdx][1];
  //   const prodName = myCart[prodIdx][2];

  //   keep(prodId);
  //   writeLog([parseInt(prodId), prodCategory, prodName, 1, fullname, '창고 재고']);

  //   if (Number(myCart[prodIdx][3]) === 0) {
  //     // remove(prodId);
  //   }
  // };

  const listenTrunkList = () => {
    storeService.collection(uid).onSnapshot(querySnapShot => {
      setMyTrunk(querySnapShot.docs);
    });
  };

  const keepProd = (id: string) => {
    plusStorageProd(id);
    minusTrunkProd(id, uid);
  };

  const sellProd = (id: string) => {
    minusTrunkProd(id, uid);
  };

  // const sellProd = e => {
  //   const prodId = e.target.parentElement.parentElement.id;
  //   const prodIdx = myCart.findIndex(item => item[0] === prodId);
  //   const fullname = localStorage.getItem('fullname');
  //   const prodCategory = myCart[prodIdx][1];
  //   const prodName = myCart[prodIdx][2];

  //   sell(prodId);
  //   writeLog([parseInt(prodId), prodCategory, prodName, 1, fullname, '판매']);
  // };

  return (
    <section id="trunk">
      <h1>내 트렁크</h1>
      <table className="trunk-table">
        <thead>
          <tr>
            <th>재고</th>
            <th>품목</th>
            <th>상세명</th>
            <th>수량</th>
            <th>판매</th>
          </tr>
        </thead>
        <tbody>
          {myTrunk.map(item => {
            const data = item.data();
            return (
              <tr key={data.id} id={data.id}>
                <td className="btn">
                  <button className="keep-btn" onClick={() => keepProd(data.id)}>
                    재고
                  </button>
                </td>
                <td className="type">{data.category}</td>
                <td className="name">{data.name}</td>
                <td className="counts">{data.count}</td>
                <td className="btn">
                  <button className="sell-btn" onClick={() => sellProd(data.id)}>
                    판매
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

// function mapDispatchToProps(dispatch) {
//   const driverId = localStorage.getItem('userId');

//   return {
//     initList: () => {
//       getSheetValues(`${driverId}!A2:D`).then(
//         response => {
//           dispatch(initCart(response.result.values));
//         },
//         reason => {
//           console.log(reason.result.error.message);
//         }
//       );
//     },
//     keep: prodId => {
//       dispatch(minusProd(prodId, driverId));
//       dispatch(plusPart(prodId));
//     },
//     sell: prodId => {
//       dispatch(minusProd(prodId, driverId));
//     },
//     remove: prodId => {
//       dispatch(deleteItem(prodId));
//     },
//   };
// }

// function mapStateToProps(state) {
//   return {
//     myCart: state.myCart,
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Cart);
export default Trunk;
