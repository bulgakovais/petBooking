import * as React from "react";
import { selectProfile } from "../../store/profile/selector";
import { selectErrReviews, selectReviews } from "../../store/reviews/selectors";
import { useDispatch, useSelector } from "react-redux";
import "../../css/style.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { getReviewsFromDB } from "../../store/reviews/actions";

export default function Reviews() {
  const user = useSelector(selectProfile);
  console.log(`user:${user}`);
  const reviews = useSelector(selectReviews);
  const errorReviews = useSelector(selectErrReviews);
  console.log(reviews);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userId } = useParams();
  console.log(`userId=${userId}`);

  useEffect(() => {
    if (isNaN(Number(userId))) {
      navigate("*");
    } else {
      dispatch(getReviewsFromDB(userId));
    }
  }, [userId]);

  if (!reviews || errorReviews) {
    return (
      <div className="review-block">
        <div className="text-lev2">Отзывы обо мне</div>
        <h3>Ой..что-то пошло не так...</h3>
      </div>
    );
  } else if (reviews.length === 0) {
    return (
      <div className="review-block">
        <div className="text-lev2">Отзывы обо мне</div>
        <h3>Нет отзывов</h3>
      </div>
    );
  }

  return (
    <>
      <div className="review-block">
        <div className="text-lev2">Отзывы обо мне</div>
        <div className="review-unit">
          {reviews.map((item) => (
            <div key={item.id} className="review-unit">
              <div className="text-lev3">{item.that_name}</div>
              <div className="rating">
                <span>
                  {/* <img src="img/star.svg" alt=""></img> */}
                  {item.rating}
                </span>
              </div>
              <div>{item.comment}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
