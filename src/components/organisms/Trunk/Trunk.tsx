import React, { useState, useEffect } from 'react';
import { QueryDocumentSnapshot, storeService } from 'firebaseApp';
import { plusStorageProd } from 'common/service/storageService';
import { minusTrunkProd } from 'common/service/trunkService';
import './Trunk.css';

interface Props {
  uid: string;
}

const Trunk: React.FC<Props> = ({ uid }) => {
  const [myTrunk, setMyTrunk] = useState<Array<QueryDocumentSnapshot>>([]);

  useEffect(() => {
    const unsubscribe = listenTrunkList();
    return () => {
      unsubscribe();
    };
  }, []);

  const keepProd = (id: string) => {
    plusStorageProd(id);
    minusTrunkProd(id, uid);
  };

  const sellProd = (id: string) => {
    minusTrunkProd(id, uid);
  };

  const listenTrunkList = () => {
    return storeService.collection(uid).onSnapshot(querySnapShot => {
      setMyTrunk(querySnapShot.docs);
    });
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

export default Trunk;
