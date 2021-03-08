import { storeService } from 'firebaseApp';

const STORAGE = 'storage';
const collection = storeService.collection(STORAGE);

export const getStorages = async (category: string) => {
  const collection = await storeService.collection('storage').where('category', '==', category).get();
  const storages = collection.docs;
  return storages;
};

export const updateStorageProd = async (id: string, count: number) => {
  await storeService.collection('storage').doc(id).update({ count });
};