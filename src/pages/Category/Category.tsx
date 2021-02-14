import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from 'common/store';
import { plusTrunkProd } from 'common/service/trunkService';
import { listenStorage, minusStorageProd } from 'common/service/storageService';
import { TiArrowBack } from 'react-icons/ti';
import { QueryDocumentSnapshot } from 'firebaseApp';
import './Category.css';

const Category: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const match = useRouteMatch<{ category: string }>();
  const { uid } = user;
  const { category } = match.params;
  const [storage, setStorage] = useState<Array<QueryDocumentSnapshot>>([]);

  useEffect(() => {
    const unsubscribe = listenStorage(chgNmToK(category), setStorage);
    return () => {
      unsubscribe();
    };
  }, []);

  const chgNmToK = (category: string): string => {
    switch (category) {
      case 'battery':
        return '배터리';
      case 'oil':
        return '오일';
      case 'oilfilter':
        return '오일필터';
      case 'airfilter':
        return '에어필터';
      case 'wiper':
        return '와이퍼';
      case 'washer':
        return '워셔액';
      case 'pad':
        return '패드';
      case 'aircon':
        return '에어컨필터';
      case 'etc':
        return '기타';
      default:
        return '';
    }
  };

  const addProd = (id: string) => {
    plusTrunkProd(id, uid);
    minusStorageProd(id);
  };

  return (
    <section id="category">
      <div className="header">
        <h1>{chgNmToK(category)}</h1>
        <Link to="/">
          <TiArrowBack />
        </Link>
      </div>

      <table className="category-table">
        <thead>
          <tr>
            <th>품목</th>
            <th>상세명</th>
            <th>수량</th>
            <th>관리</th>
          </tr>
        </thead>
        <tbody>
          {storage.map(item => {
            const data = item.data();
            return (
              <tr key={data.id} id={data.id}>
                <td>{data.category}</td>
                <td>{data.name}</td>
                <td>{data.count}</td>
                <td>
                  <button onClick={() => addProd(data.id)}>담기</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};
export default Category;
