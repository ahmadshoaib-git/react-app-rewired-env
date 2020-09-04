import { createStore, applyMiddleware, compose } from "redux";
import { createBrowserHistory } from "history";
import thunk from "redux-thunk";
// import allReducers from '../redux/reducers';
import createRootReducer from "./reducers";

const history = createBrowserHistory();
const middlewares = [thunk];

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

const configureStore = (initialState) => {
  return createStore(
    createRootReducer(history),
    composeEnhancers(applyMiddleware(...middlewares))
  );
};

export { configureStore, history };
