import { REQUEST_STATUS } from "../storeConstants";
import {
  CITIES_PENDING,
  SEARCH_RESULT_PENDING,
  SET_CITIES,
  SET_SEARCH_ERROR,
  SET_SEARCH_RESULT,
  SET_CITIES_ERROR,
} from "./actionTypes";

const initialState = {
  searchResult: [],
  errorResearch: null,
  errorCities: null,
  cities: [],
  statusRequestSearch: REQUEST_STATUS.IDLE,
  statusRequestCities: REQUEST_STATUS.IDLE,
};

export const searchResultReducer = (
  state = initialState,
  { type, payload }
) => {
  switch (type) {
    case SEARCH_RESULT_PENDING: {
      return {
        ...state,
        searchResult: [],
        errorResearch: null,
        statusRequestSearch: REQUEST_STATUS.PENDING,
      };
    }
    case SET_SEARCH_RESULT: {
      return {
        ...state,
        searchResult: payload,
        errorResearch: null,
        statusRequestSearch: REQUEST_STATUS.SUCCESS,
      };
    }
    case SET_SEARCH_ERROR: {
      return {
        ...state,
        errorResearch: payload,
        statusRequestSearch: REQUEST_STATUS.ERROR,
      };
    }
    case CITIES_PENDING: {
      return {
        ...state,
        cities: [],
        errorCities: null,
        statusRequestCities: REQUEST_STATUS.PENDING,
      };
    }
    case SET_CITIES: {
      return {
        ...state,
        cities: payload,
        errorCities: null,
        statusRequestCities: REQUEST_STATUS.SUCCESS,
      };
    }
    case SET_CITIES_ERROR: {
      return {
        ...state,
        errorCities: payload,
        statusRequestCities: REQUEST_STATUS.ERROR,
      };
    }
    default:
      return state;
  }
};
