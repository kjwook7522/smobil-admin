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
