export const LOADING_ON = "LOADING_ON";
export const LOADING_OFF = "LOADING_OFF";

export const setLoading = isLoading => {
  if (isLoading) {
    return {
      type: LOADING_ON,
    };
  } else {
    return {
      type: LOADING_OFF,
    };
  }
};
