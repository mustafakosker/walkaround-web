import { createSelector } from 'reselect';
import { SHOW_LOADING, HIDE_LOADING, API_REQUEST } from '../utils/apiUtil';

const initialState = {
  requestCount: 0,
  networkError: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SHOW_LOADING:
      return {
        ...state,
        requestCount: state.requestCount + 1,
      };
    case HIDE_LOADING:
      return {
        ...state,
        requestCount: state.requestCount - 1,
      };
    case API_REQUEST:
      return {
        ...state,
        networkError: action.error,
        requestCount: action.error ? (state.requestCount - 1) : state.requestCount,
      };
    default:
      return state;
  }
};

const getRequestCount = state => state.loading.requestCount;

export const showLoading = createSelector([getRequestCount], requestCount => requestCount > 0);
