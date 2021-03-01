export const INIT_TRUNK = 'INIT_TRUNK';
export const PLUS_TRUNK_PROD = 'PLUS_TRUNC_PROD';
export const MINUS_TRUNK_PROD = 'MINUS_TRUNK_PROD';

export const initTrunk = (trunkList: ProductionList): TrunkInitAction => ({
  type: INIT_TRUNK,
  trunkList,
});

export const plusTrunkProd = (uid: string, id: string): TrunkCountAction => ({
  type: PLUS_TRUNK_PROD,
  uid,
  id,
});

export const minusTrunkProd = (uid: string, id: string): TrunkCountAction => ({
  type: MINUS_TRUNK_PROD,
  uid,
  id,
});
