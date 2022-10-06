import React, {useState} from "react"; 
import { useParams } from "react-router";
import {useSelector,useDispatch} from 'react-redux';
import {addReviewToDB } from "../../store/reviews/actions";
import {selectAccount} from "../../store/account/selector";
import {getUser} from "../../store/userAuth/selectors";



export function ReviewForm () {
    const { userId } = useParams();
    const dispatch = useDispatch();
    const currentUser = useSelector(selectAccount);
    const [rating, setRating] = useState(3); 
    const [reviewText, setReviewText] = useState('');  
    const token = useSelector(getUser).token  
    const thatId = currentUser.id;


    function setRatingHandler(event) {
        setRating(event.target.value)
    } 

    function setReviewTextHandler(event) {
        setReviewText(event.target.value)
    }
    function clearForm () {
        setRating(3);
        setReviewText('');
    }
    
    function idCheck (profileId, accountId) {
        if(Number(profileId) !== accountId) {
            return true
        } else {
            return false
        }
    }

    function reviewSubmitHandler(event) {
        event.preventDefault();
        if(idCheck(userId,thatId)) {
            if(reviewText) {
                dispatch(addReviewToDB(token,thatId, userId, rating, reviewText))
                 clearForm();
             } else {
                 alert('Поле комментарий не может быть пустым!')
             }
        } else {
            alert('Нельзя оставить отзыв себе!')
        }
           
    }
    return <>
    <div class="review-block">
        <form onSubmit={reviewSubmitHandler}>
               <div className="rating-area" value={Number(rating)} onChange={setRatingHandler}>
                            <input type="radio" id="star-5" name="rating" value="5"/>
                            <label for="star-5" title="Оценка «5»"></label>
                            <input type="radio" id="star-4" name="rating" value="4"/>
                            <label for="star-4" title="Оценка «4»"></label>
                            <input type="radio" id="star-3" name="rating" value="3"/>
                            <label for="star-3" title="Оценка «3»"></label>
                            <input type="radio" id="star-2" name="rating" value="2"/>
                            <label for="star-2" title="Оценка «2»"></label>
                            <input type="radio" id="star-1" name="rating" value="1"/>
                            <label for="star-1" title="Оценка «1»"></label>
                        </div>
                <textarea id="login" name="reviews" rows="5" placeholder="Введите текст отзыва" maxlength="500"
                required
                value={reviewText} onChange={setReviewTextHandler} />
                <input class="btn review_submit" type="submit" value="Отправить"></input>
        </form>
    </div>
    </>
}
