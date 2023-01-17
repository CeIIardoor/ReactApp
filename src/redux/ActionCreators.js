import * as ActionTypes from "./ActionTypes";
import DISHES from "../shared/dishes.js";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    dishId,
    rating,
    author,
    comment
  }
});

export const fetchDishes = () => dispatch => {
  dispatch(dishesLoading(true));
  console.log("fetchDishes() delay started");
  setTimeout(() => {
    dispatch(addDishes(DISHES));
    console.log("fetchDishes() delay end");
  }, 1000);
};

export const dishesLoading = () => ({
  type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = errmess => ({
  type: ActionTypes.DISHES_FAILED,
  payload: errmess
});

export const addDishes = dishes => ({
  type: ActionTypes.ADD_DISHES,
  payload: dishes
});
