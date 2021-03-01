export const INIT_STORAGE = 'INIT_STORAGE';
export const PLUS_STORAGE_PROD = 'PLUS_STORAGE_PROD';
export const MINUS_STORAGE_PROD = 'MINUS_STORAGE_PROD';

export const initStorage = (storageList: ProductionList): StorageInitAction => ({
  type: INIT_STORAGE,
  storageList,
});

export const plusStorageProd = (id: string): StorageCountAction => ({
  type: PLUS_STORAGE_PROD,
  id,
});

export const minusStorageProd = (id: string): StorageCountAction => ({
  type: MINUS_STORAGE_PROD,
  id,
});
