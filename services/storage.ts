import Cookies from "js-cookie";

/**
 * Removes all user data from local storage.
 */
const clearUserData = () => {
  localStorage.removeItem("@authToken");
  localStorage.removeItem("@refreshToken");
  localStorage.removeItem("@userData");
  localStorage.removeItem("@surveyCount");
  localStorage.removeItem("@surveyDisplayed");
  Cookies.remove("token");
};

/**
 * Sets the authentication data in local storage.
 * @param token - The authentication token.
 * @param refreshToken - The refresh token.
 */
const setAuthData = (token: string, refreshToken: string) => {
  localStorage.setItem("@authToken", token);
  localStorage.setItem("@refreshToken", refreshToken);
};

/**
 * Gets the authentication data from local storage.
 * @returns An object containing the authentication token and refresh token.
 */
const getAuthData = (): {
  token: string | null;
  refreshToken: string | null;
} => {
  const token = localStorage.getItem("@authToken");
  const refreshToken = localStorage.getItem("@refreshToken");

  return { token, refreshToken };
};

/**
 * Sets the user data in local storage.
 * @param data - The user data to be stored.
 */
const setUserData = (data: any) => {
  if (data?.id) {
    localStorage.setItem("@userData", JSON.stringify(data));
  }
};

/**
 * Gets the user data from local storage.
 * @returns An object containing the user data.
 */
const getUserData = () => {
  const userData = localStorage.getItem("@userData");
  if (userData) {
    const user = JSON.parse(userData);
    return { ...user };
  }
  return {};
};

/**
 * Sets the user data in local storage.
 */
const setSurveyDisplayed = () => {
  localStorage.setItem("@surveyDisplayed", "true");
};

/**
 *  Gets the user data from local storage.
 * @returns An object containing the user data.
 */
const getSurveyDisplayed = () => {
  return localStorage.getItem("@surveyDisplayed") === "true";
};

/**
 *  Sets the number of surveys displayed in local storage.
 * @param count  - The number of surveys displayed.
 */
const setSurveyCount = (count: number) => {
  console.log(count);
  localStorage.setItem("@surveyCount", count.toString());
};

/**
 *  Gets the number of surveys displayed from local storage.
 * @returns The number of surveys displayed.
 */
const getSurveyCount = () => {
  const count = localStorage.getItem("@surveyCount");
  if (count) {
    return Number.parseInt(count);
  }
  return 0;
};

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
