export const PLUS_PART_COUNT = "PLUS_PART_COUNT";
export const MINUS_PART_COUNT = "MINUS_PART_COUNT";
export const INIT_PART = "INIT_PART";

export const plusPart = id => {
  return {
    type: PLUS_PART_COUNT,
    id,
  };
};

export const minusPart = id => {
  return {
    type: MINUS_PART_COUNT,
    id,
  };
};

export const initPart = data => {
  return {
    type: INIT_PART,
    data,
  };
};
