interface DefaultAction {
  type: string;
  payload: boolean;
}

interface UserAction {
  type: string;
  user: User;
}

interface TrunkInitAction {
  type: 'INIT_TRUNK';
  trunkList: ProductionList;
}

interface TrunkCountAction {
  type: 'PLUS_TRUNC_PROD' | 'MINUS_TRUNK_PROD';
  uid: string;
  id: string;
}

interface StorageInitAction {
  type: 'INIT_STORAGE';
  storageList: ProductionList;
}

interface StorageCountAction {
  type: 'PLUS_STORAGE_PROD' | 'MINUS_STORAGE_PROD';
  id: string;
}
