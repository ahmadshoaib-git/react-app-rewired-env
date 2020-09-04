import axios from "axios";

export const SET_ACTION_ITEMS = "SET_ACTION_ITEMS";
export const SET_ACTION_LABEL = "SET_ACTION_LABEL";
export const SET_PACKAGE_DETAILS = "SET_PACKAGE_DETAILS";
export const SET_ACTION_ITEM_LOADING = "SET_ACTION_ITEM_LOADING";
export const CLEAR_ACTION_ITEMS = "CLEAR_ACTION_ITEMS";

const setActionItems = (data) => ({
  type: SET_ACTION_ITEMS,
  data,
});

const setActionLabel = (data) => ({
  type: SET_ACTION_LABEL,
  data,
});

const setActionDetail = (data) => ({
  type: SET_PACKAGE_DETAILS,
  data,
});

const setActionItemLoading = (data) => ({
  type: SET_ACTION_ITEM_LOADING,
  data,
});

const clearActionItems = (data) => ({
  type: CLEAR_ACTION_ITEMS,
});

const action_setActionItems = (data) => (dispatch) => {
  dispatch(setActionItems(data));
};

const action_setActionLabel = (data) => (dispatch) => {
  dispatch(setActionLabel(data));
};

const action_setActionDetail = (data) => (dispatch) => {
  dispatch(setActionDetail(data));
};

const action_setActionItemLoading = (data) => (dispatch) => {
  dispatch(setActionItemLoading(data));
};

const action_clearActionItems = (data) => (dispatch) => {
  dispatch(clearActionItems(data));
};

export {
  action_setActionItems,
  action_setActionLabel,
  action_setActionDetail,
  action_setActionItemLoading,
  action_clearActionItems,
};
