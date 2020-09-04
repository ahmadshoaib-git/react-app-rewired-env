import {
  SET_ACTION_ITEMS,
  SET_ACTION_LABEL,
  SET_PACKAGE_DETAILS,
  SET_ACTION_ITEM_LOADING,
  CLEAR_ACTION_ITEMS,
} from "./actionItems.actions";

const initialState = {
  actionItems: undefined,
  actionLabel: undefined,
  packageDetails: undefined,
  actionItemsLoading: false,
};

const ActionItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ACTION_ITEMS:
      return {
        ...state,
        actionItems: action.data,
      };
    case SET_ACTION_LABEL:
      return {
        ...state,
        actionLabel: action.data,
      };
    case SET_PACKAGE_DETAILS:
      return {
        ...state,
        packageDetails: action.data,
      };
    case SET_ACTION_ITEM_LOADING:
      return {
        ...state,
        actionItemsLoading: action.data,
      };
    case CLEAR_ACTION_ITEMS:
      return {
        ...state,
        actionItems: { ...initialState.actionItems },
        actionLabel: { ...initialState.actionLabel },
        packageDetails: { ...initialState.packageDetails },
        actionItemsLoading: { ...initialState.actionItemsLoading },
      };
    default:
      return { ...state };
  }
};

export default ActionItemReducer;
