import { QueryDocumentSnapshot, storeService } from 'firebaseApp';

export const getDriver = async (uid: string): Promise<QueryDocumentSnapshot | undefined> => {
  const collection = await storeService.collection('drivers').get();
  const driver = collection.docs.find(item => uid === item.data()?.uid);
  return driver;
};
