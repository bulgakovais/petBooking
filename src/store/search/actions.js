import { API_URL } from "../storeConstants";
import {
  CITIES_PENDING,
  SEARCH_RESULT_PENDING,
  SET_CITIES,
  SET_SEARCH_ERROR,
  SET_SEARCH_RESULT,
  SET_CITIES_ERROR,
} from "./actionTypes";

const baseURL = API_URL;

const setSearchResult = (searchResult) => ({
  type: SET_SEARCH_RESULT,
  payload: searchResult,
});

const setSearchError = (error) => ({
  type: SET_SEARCH_ERROR,
  payload: error,
});

const setCitiesError = (error) => ({
  type: SET_CITIES_ERROR,
  payload: error,
});

const setCities = (cities) => ({
  type: SET_CITIES,
  payload: cities,
});

const getCitiesPending = () => ({
  type: CITIES_PENDING,
});

const getSearchResultPending = () => ({
  type: SEARCH_RESULT_PENDING,
});

export const getCities = () => async (dispatch) => {
  dispatch(getCitiesPending());
  try {
    fetch(baseURL + `/locations?filters[city_id]`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((responce) => responce.json())
      .then((data) => {
        const result = data.data.cities;
        dispatch(setCities(result));
      });
  } catch (error) {
    dispatch(setCitiesError(error.message));
    console.log(error.message);
  }
};

export const getSearchResult = (city, size) => async (dispatch) => {
  dispatch(getSearchResultPending());
  let URL = `/recipients?filters[city_id]=${city}`

  if (size) {
    URL += `&filters[pet_size]=${size}`
  }

  try {
    fetch(baseURL + URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((responce) => responce.json())
      .then((data) => {
        const result = data.data.users;
        // console.log(result);
        dispatch(setSearchResult(result));
      });
  } catch (error) {
    console.log(error.message);
    dispatch(setSearchError(error.message));
  }

};
