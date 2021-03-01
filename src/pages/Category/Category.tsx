import React, { useEffect } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'common/store';
import { initStorage, minusStorageProd } from 'actions/storage';
import { plusTrunkProd } from 'actions/trunk';
import { getStorages } from 'common/service/storageService';
import { TiArrowBack } from 'react-icons/ti';
import './Category.css';

const convertNameToKorean = (category: string): string => {
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

const Category: React.FC = () => {
  const user = useSelector((state: RootState) => state.userReducer);
  const match = useRouteMatch<{ category: string }>();
  const dispatch = useDispatch();
  const { uid } = user;
  const category = convertNameToKorean(match.params.category);
  const storage = useSelector((state: RootState) => state.storageReducer);

  useEffect(() => {
    fetchStorage(category);
  }, []);

  const fetchStorage = async (category: string) => {
    const result = await getStorages(category);
    let storage: ProductionList = [];
    result.forEach(prod => {
      const data = prod.data();
      const tempProd: Production = {
        id: data.id,
        category: data.catgeory,
        name: data.name,
        count: data.count,
      };

      storage.push(tempProd);
    });

    dispatch(initStorage(storage));
  };

  const addProd = (id: string) => {
    dispatch(plusTrunkProd(uid, id));
    dispatch(minusStorageProd(id));
  };

  return (
    <section id="category">
      <div className="header">
        <h1>{category}</h1>
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
          {storage.map(prod => {
            return (
              <tr key={prod.id} id={prod.id}>
                <td>{prod.category}</td>
                <td>{prod.name}</td>
                <td>{prod.count}</td>
                <td>
                  <button onClick={() => addProd(prod.id)}>담기</button>
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
