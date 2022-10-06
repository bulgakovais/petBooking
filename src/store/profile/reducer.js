import { REQUEST_STATUS } from "../storeConstants";
import { PROFILE_PENDING, SET_ERROR, SET_PROFILE } from "./actioinTypes";

const initialState = {
  //profile will be like this {id, name, description, phone, img, locations, address, petSize, otherAnimals}
  profile: {},
  error: null,
  statusRequest: REQUEST_STATUS.IDLE,
};

export const profileReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_PROFILE: {
      return {
        ...state,
        error: null,
        profile: payload,
        statusRequest: REQUEST_STATUS.SUCCESS,
      };
    }
    case SET_ERROR: {
      return {
        ...state,
        error: payload,
        statusRequest: REQUEST_STATUS.ERROR,
      };
    }
    case PROFILE_PENDING: {
      return {
        ...state,
        profile: {},
        error: null,
        statusRequest: REQUEST_STATUS.PENDING,
      };
    }
    default:
      return state;
  }
};
