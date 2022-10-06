import { clearAccount } from "../account/actions";
import { API_URL } from "../storeConstants";
import { sendRequest } from "../helpers";

const baseURL = API_URL;

const signUpUrl = baseURL + "/register";
const logInUrl = baseURL + "/login";

export const SIGNUP_USER = "SIGNUP_USER";
export const LOGIN_USER = "LOGIN_USER";
export const LOGOUT_USER = "LOGOUT_USER";
export const SET_ERROR = "SET_ERROR";

export const signUpUser = (user) => ({
  type: SIGNUP_USER,
  payload: user
});
export const logInUser = (user) => ({
  type: LOGIN_USER,
  payload: user
});

export const logOutUser = () => ({
  type: LOGOUT_USER,
});

export const setErrorAction = (error) => ({
  type: SET_ERROR,
  payload: error
})

export const signUpUserThunk =
  (name, email, password, confirmation) => (dispatch) => {
    const body = {
      name: name,
      email: email,
      password: password,
      password_confirmation: confirmation,
    };
    sendRequest("POST", signUpUrl, body)
      .then((response) => {
        const token = response.data.token;
        const user = {
          name: name,
          email: email,
          token: token,
        };
        dispatch(signUpUser(user));
      })
      .catch((err) => dispatch(setErrorAction(err.message)));
  };

export const logInUserThunk = (email, password) => (dispatch) => {
  const body = {
    email: email,
    password: password,
  };
  sendRequest("POST", logInUrl, body)
    .then((response) => {
      const token = response.data.token;
      const user = {
        email: email,
        token: token,
      };
      dispatch(logInUser(user));
    })
    .catch((err) => dispatch(setErrorAction(err.message)));
};

export const logOutUserAction = (dispatch) => {
  dispatch(logOutUser());
  dispatch(clearAccount());
};

export const initAuthAction = (user) => (dispatch) => {
  if (user !== null) {
    dispatch(logInUser(user));
  } else {
    dispatch(logOutUser());
    dispatch(clearAccount());
  }
};
