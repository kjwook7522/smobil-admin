import { QueryDocumentSnapshot, storeService } from 'firebaseApp';

const STORAGE = 'storage';
const collection = storeService.collection(STORAGE);

export const minusStorageProd = async (id: string) => {
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

export const plusStorageProd = async (id: string) => {
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