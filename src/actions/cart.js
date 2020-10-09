export const PLUS_CART_COUNT = "PLUS_CART_COUNT";
export const MINUS_CART_COUNT = "MINUS_CART_COUNT";
export const INIT_CART = "INIT_CART";

export const plusProd = id => {
  return {
    type: PLUS_CART_COUNT,
    id,
  };
};

export const minusProd = id => {
  return {
    type: MINUS_CART_COUNT,
    id,
  };
};

export const initCart = data => {
  return {
    type: INIT_CART,
    data,
  };
};
