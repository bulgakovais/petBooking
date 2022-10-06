import { compose, combineReducers, createStore, applyMiddleware } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { profileReducer } from "./profile/reducer";
import { searchResultReducer } from "./search/reducer";
import { accountReducer } from "./account/reducer";
import { userAuthReducer } from "./userAuth/reducer";
import { reviewsReducer } from "./reviews/reducer";


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  profile: profileReducer,
  search: searchResultReducer,
  account: accountReducer,
  auth: userAuthReducer,
  reviews: reviewsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
