import { storeService } from 'firebaseApp';

export const minusTrunkProd = async (id: string, uid: string) => {
  const collection = storeService.collection(uid);

  try {
    const doc = await collection.doc(id).get();
    const data = doc.data();
    const count = data?.count;
    await collection.doc(id).set({ ...data, count: count - 1 });
  } catch (error) {
    console.error(error);
    alert('상품 업데이트에 실패했습니다');
  }
};

export const plusTrunkProd = async (id: string, uid: string) => {
  const collection = storeService.collection(uid);

  try {
    const doc = await collection.doc(id).get();
    const data = doc.data();
    const count = data?.count;
    await collection.doc(id).set({ ...data, count: count + 1 });
  } catch (error) {
    console.error(error);
    alert('상품 업데이트에 실패했습니다');
  }
};
