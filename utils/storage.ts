const clearUserData = () => {
  localStorage.removeItem('@authToken');
  localStorage.removeItem('@userData');
};

const setAuthData = (token: string) => {
  localStorage.setItem('@authToken', token);
};

const getAuthData = () => {
  const token = localStorage.getItem('@authToken');

  return { token };
};

const setUserData = (data: any) => {
  if (data?.id) {
    localStorage.setItem('@userData', JSON.stringify(data));
  }
};

const getUserData = () => {
  const userData = localStorage.getItem('@userData');
  if (userData) {
    const user = JSON.parse(userData);
    return { ...user };
  }
  return {}
};

const Storage = {
  clearUserData,
  setAuthData,
  getAuthData,
  setUserData,
  getUserData
};

export default Storage;