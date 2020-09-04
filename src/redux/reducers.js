import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import ActionItemReducer from "./actionItems/actionItems.reducer";

export default (history) =>
  combineReducers({
    router: connectRouter(history),
    actionItems: ActionItemReducer,
  });
