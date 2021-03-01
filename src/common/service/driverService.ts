import { QueryDocumentSnapshot, storeService } from 'firebaseApp';

export const getDriver = async (uid: string): Promise<QueryDocumentSnapshot | undefined> => {
  const collection = await storeService.collection('drivers').get();
  const driver = collection.docs.find(item => uid === item.data()?.uid);
  return driver;
};

export const getAllDrivers = async (): Promise<Array<QueryDocumentSnapshot>> => {
  const collection = await storeService.collection('drivers').get();
  const drivers = collection.docs;
  return drivers;
};
