export const getTokens = () => {
  return {
    refreshToken: localStorage.getItem("refreshToken"),
    authToken: sessionStorage.getItem("authToken"),
  };
};

export const setTokens = (state) => {
  localStorage.setItem("refreshToken", state.refreshToken);
  sessionStorage.setItem("authToken", state.authToken);
};
