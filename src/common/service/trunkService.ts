import { storeService } from 'firebaseApp';

const makeProd = async (id: string) => {
  const doc = await storeService.collection('storage').doc(id).get();
  const data = doc.data();
  return { ...data, count: 0 };
};

// Minus 1 count of trunk product
export const minusTrunkProd = async (id: string, uid: string) => {
  const collection = storeService.collection(uid);

  try {
    const doc = await collection.doc(id).get();
    const data = doc.data();
    const count = data?.count;

    // if count becomes zero(0), then delete doc
    if (count !== 1) {
      await collection.doc(id).set({ ...data, count: count - 1 });
    } else {
      await collection.doc(id).delete();
    }
  } catch (error) {
    console.error(error);
    alert('상품 업데이트에 실패했습니다');
  }
};

// Plus 1 count of trunk product
export const plusTrunkProd = async (id: string, uid: string) => {
  const collection = storeService.collection(uid);

  try {
    const doc = await collection.doc(id).get();
    let data = doc.data();

    // if data is null, then create product ref
    if (!data) {
      data = await makeProd(id);
    }
    const count = data?.count;
    await collection.doc(id).set({ ...data, count: count + 1 });
  } catch (error) {
    console.error(error);
    alert('상품 업데이트에 실패했습니다');
  }
};

export const listenTrunk = (uid: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
  return storeService.collection(uid).onSnapshot(querySnapShot => {
    setState(querySnapShot.docs);
  });
};
