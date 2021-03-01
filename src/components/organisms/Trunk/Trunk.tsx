import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/store';
import { initTrunk, minusTrunkProd } from 'actions/trunk';
import { plusStorageProd } from 'actions/storage';
import { getTrunkProds } from 'common/service/trunkService';
import './Trunk.css';

interface Props {
  uid: string;
}

const Trunk: React.FC<Props> = ({ uid }) => {
  const dispatch = useDispatch();
  const myTrunk = useSelector((state: RootState) => state.trunkReducer);

  useEffect(() => {
    fetchMyTrunk(uid);
  }, []);

  const fetchMyTrunk = async (uid: string) => {
    const result = await getTrunkProds(uid);
    let myTrunk: ProductionList = [];
    result.forEach(prod => {
      const data = prod.data();
      const tempProd: Production = {
        id: data.id,
        category: data.catgeory,
        name: data.name,
        count: data.count,
      };

      myTrunk.push(tempProd);
    });
    dispatch(initTrunk(myTrunk));
  };

  const keepProd = (id: string) => {
    dispatch(minusTrunkProd(uid, id));
    dispatch(plusStorageProd(id));
  };

  const sellProd = (id: string) => {
    dispatch(minusTrunkProd(uid, id));
  };

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
          {myTrunk.map(prod => {
            return (
              <tr key={prod.id} id={prod.id}>
                <td className="btn">
                  <button className="keep-btn" onClick={() => keepProd(prod.id)}>
                    재고
                  </button>
                </td>
                <td className="type">{prod.category}</td>
                <td className="name">{prod.name}</td>
                <td className="counts">{prod.count}</td>
                <td className="btn">
                  <button className="sell-btn" onClick={() => sellProd(prod.id)}>
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

export default Trunk;
