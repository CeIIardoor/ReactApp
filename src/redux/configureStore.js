import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { logger } from "redux-logger";
import { createForms } from "react-redux-form";
import { Dishes } from "./dishes.js";
import { Comments } from "./comments.js";
import { Promotions } from "./promotions.js";
import { Leaders } from "./leaders.js";
import { InitialFeedback } from "./forms.js";

export const ConfigureStore = () => {
  return createStore(
    combineReducers({
      dishes: Dishes,
      comments: Comments,
      promotions: Promotions,
      leaders: Leaders,
      ...createForms({
        feedback: InitialFeedback
      })
    }),
    applyMiddleware(thunk, logger)
  );
};
