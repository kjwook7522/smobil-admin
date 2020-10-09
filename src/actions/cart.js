export const PLUS_COUNT = "PLUS_COUNT";
export const MINUS_COUNT = "MINUS_COUNT";
export const INIT_LIST = "INIT_LIST";

export const plusProd = id => {
  return {
    type: PLUS_COUNT,
    id,
  };
};

export const minusProd = id => {
  return {
    type: MINUS_COUNT,
    id,
  };
};

export const init = data => {
  return {
    type: INIT_LIST,
    data,
  };
};
