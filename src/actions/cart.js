export const PLUS_CART_COUNT = "PLUS_CART_COUNT";
export const MINUS_CART_COUNT = "MINUS_CART_COUNT";
export const ADD_CART_ITEM = "ADD_CART_ITEM";
export const DELETE_CART_ITEM = "DELETE_CART_ITEM";
export const INIT_CART = "INIT_CART";

export const plusProd = (id, driverId) => {
  return {
    type: PLUS_CART_COUNT,
    id,
    driverId,
  };
};

export const minusProd = (id, driverId) => {
  return {
    type: MINUS_CART_COUNT,
    id,
    driverId,
  };
};

export const addItem = (id, kind, name) => {
  return {
    type: ADD_CART_ITEM,
    id,
    kind,
    name,
  };
};

export const deleteItem = id => {
  return {
    type: DELETE_CART_ITEM,
    id,
  };
};

export const initCart = data => {
  return {
    type: INIT_CART,
    data,
  };
};
