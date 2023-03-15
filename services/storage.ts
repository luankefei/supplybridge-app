const clearUserData = () => {
  localStorage.removeItem('@authToken');
  localStorage.removeItem('@refreshToken');
  localStorage.removeItem('@userData');
  localStorage.removeItem('@surveyCount');
  localStorage.removeItem('@surveyDisplayed');
};

const setAuthData = (token: string, refreshToken: string) => {
  localStorage.setItem('@authToken', token);
  localStorage.setItem('@refreshToken', refreshToken);
};

const getAuthData = () => {
  const token = localStorage.getItem('@authToken');
  const refreshToken = localStorage.getItem('@refreshToken');

  return { token, refreshToken };
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

const setSurveyDisplayed = () => {
  localStorage.setItem("@surveyDisplayed", "true");
}

const getSurveyDisplayed = () => {
  return localStorage.getItem("@surveyDisplayed") === "true";
}

const setSurveyCount = (count: number) => {
  console.log(count);
  localStorage.setItem("@surveyCount", count.toString());
}

const getSurveyCount = () => {
  const count = localStorage.getItem("@surveyCount");
  if (count) {
    return Number.parseInt(count)
  }
  return 0;
}

const Storage = {
  clearUserData,
  setAuthData,
  getAuthData,
  setUserData,
  getUserData,
  setSurveyCount,
  getSurveyCount,
  setSurveyDisplayed,
  getSurveyDisplayed,
};

export default Storage;