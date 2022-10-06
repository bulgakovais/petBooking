import {
  CLEAR_ACCOUNT,
  SET_ACCOUNT,
  SET_ERROR,
  ACCOUNT_PENDING,
  ALL_CITIES_PENDING,
  SET_ALL_CITIES,
  SET_ERROR_ALL_CITIES,
  EDIT_PENDING,
  EDIT_SUCCESS,
  EDIT_ERROR,
  EDIT_IDLE,
} from "./actionTypes";
import { API_URL } from "../storeConstants";
import { logOutUser } from "../userAuth/actions";

const baseURL = API_URL;

const setAccount = (account) => ({
  type: SET_ACCOUNT,
  payload: account,
});

const setError = (errorAccount) => ({
  type: SET_ERROR,
  payload: errorAccount,
});

export const clearAccount = () => ({
  type: CLEAR_ACCOUNT,
});

const getAccountPending = () => ({
  type: ACCOUNT_PENDING,
});

const getAllCitiesPending = () => ({
  type: ALL_CITIES_PENDING,
});

const setAllCities = (allCities) => ({
  type: SET_ALL_CITIES,
  payload: allCities,
});

const setErrorAllCities = (errorCities) => ({
  type: SET_ERROR_ALL_CITIES,
  payload: errorCities,
});

const editPending = () => ({
  type: EDIT_PENDING,
});

const editSuccess = () => ({
  type: EDIT_SUCCESS,
});

const editError = () => ({
  type: EDIT_ERROR,
});

export const editIdle = () => ({
  type: EDIT_IDLE,
});

export const getAccountFromDB = (token) => async (dispatch) => {
  dispatch(getAccountPending());
  try {
    const response = await fetch(baseURL.slice(0, -3) + `/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    dispatch(setAccount(data.data));
  } catch (e) {
    console.log(e.message);
    dispatch(setError(e.message));
  }
};

export const getAllCities = () => async (dispatch) => {
  dispatch(getAllCitiesPending());
  try {
    const response = await fetch(baseURL + `/locations`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    const result = data.data.cities;
    dispatch(setAllCities(result));
  } catch (e) {
    console.log(e.message);
    dispatch(setErrorAllCities(e.message));
  }
};

export const editAccount =
  (token, newAccount, photoFlag) => async (dispatch) => {
    dispatch(editPending());
    try {
      const response = await fetch(baseURL + `/usersave/${newAccount.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newAccount),
      });
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      const data = await response.json();
      if (!photoFlag) {
        dispatch(editSuccess());
      }
      console.log(data);
      // console.log(data.data.user);
      // dispatch(setAccount(data.data.user));
    } catch (e) {
      console.log(e.message);
      dispatch(setError(e.message));
      dispatch(editError());
    }
  };

export const addPhoto = (token, formData) => async (dispatch) => {
  dispatch(editPending());
  try {
    const responseImg = await fetch(baseURL + `/image/save`, {
      method: "POST",
      headers: {
        // "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });
    if (!responseImg.ok) {
      throw new Error(`Request failed: ${responseImg.status}`);
    }
    // console.log(responseImg);
    const dataImg = await responseImg.json();
    console.log(dataImg);
    dispatch(editSuccess());
    // console.log(dataImg.data.image);
  } catch (e) {
    console.log(e.message);
    dispatch(setError(e.message));
    dispatch(editError());
  }
};

export const changeAccountPassword = (token, passwords) => async (dispatch) => {
  dispatch(editPending());
  try {
    const response = await fetch(baseURL + `/change_password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(passwords),
    });
    if (!response.ok) {
      const data = await response.json();
      console.log(data);
      if (data.errors) {
        throw new Error(`${data.message}`);
      } else {
        throw new Error(`Request failed: ${response.status}`);
      }
    }
    const data = await response.json();
    console.log(data);
    dispatch(editSuccess());
  } catch (e) {
    console.log(e.message);
    dispatch(setError(e.message));
    dispatch(editError());
  }
};

export const deleteAccount = (token, id) => async (dispatch) => {
  try {
    const response = await fetch(baseURL + `/usersave/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Request failed: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    dispatch(clearAccount());
    dispatch(logOutUser());
  } catch (e) {
    console.log(e.message);
    dispatch(setError(e.message));
    dispatch(editError());
  }
};
