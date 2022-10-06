import { API_URL } from "../storeConstants";
import { GET_REVIEWS, ERR_REVIEWS, RESET_REVIEWS } from "./actionTypes";
import {getProfileFromDB} from "../profile/actions";

// const baseURL = "http://l7933yx2.beget.tech/api/v1";
const baseURL = API_URL;
const saveReviewURL = `${baseURL}/reviewsave`;

const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  payload: reviews,
});

const errReviews = (error) => ({
  type: ERR_REVIEWS,
  payload: error,
});

const resetReviews = () => ({
  type: RESET_REVIEWS
})

export const resetReviewsAction = (dispatch) => {
  dispatch(resetReviews());
}


export const addReviewToDB = (token,thatId, userId, rating, reviewText) => async (dispatch) =>{
    const review = {
        that_id: thatId,
        to_whom_id: userId,
        rating: rating,
        comment: reviewText
    }
    let response = await fetch(saveReviewURL, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
    },
        body: JSON.stringify(review)});
    
        let result = await response.json();
        console.log(result.message);

        dispatch(getReviewsFromDB(userId))
        dispatch(getProfileFromDB(Number(userId)))
        }

export const getReviewsFromDB = (id) => async (dispatch) => {
  try {
    fetch(baseURL + `/reviews/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const result = data.data.reviews;
        console.log(result);
        dispatch(getReviews(result));
      });
  } catch (e) {
    console.log(e.message);
    dispatch(errReviews(e.message));
  }
};
