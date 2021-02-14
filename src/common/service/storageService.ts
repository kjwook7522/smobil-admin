import { storeService } from 'firebaseApp';

const STORAGE = 'storage';
const collection = storeService.collection(STORAGE);

// Minus 1 count of storage product
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

// Plus 1 count of storage product
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

export const listenStorage = (category: string, setState: React.Dispatch<React.SetStateAction<any>>) => {
  return storeService
    .collection('storage')
    .where('category', '==', category)
    .onSnapshot(querySnapShot => {
      setState(querySnapShot.docs);
    });
};
