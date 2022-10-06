import { API_URL } from "../storeConstants";
import { PROFILE_PENDING, SET_ERROR, SET_PROFILE } from "./actioinTypes";

const baseURL = API_URL;

const setProfile = (profile) => ({
  type: SET_PROFILE,
  payload: profile,
});

const setError = (error) => ({
  type: SET_ERROR,
  payload: error,
});

const getProfilePending = () => ({
  type: PROFILE_PENDING,
});

export const getProfileFromDB = (id) => async (dispatch) => {
  dispatch(getProfilePending());
  try {
    const response = await fetch(baseURL + `/users/${Number(id)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    // console.log(data.data.user);
    dispatch(setProfile(data.data.user));
  } catch (e) {
    console.log(e.message);
    dispatch(setError(e.message));
  }
};
