import { CALL_API, getJSON, ApiError } from 'redux-api-middleware';

export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const API_REQUEST = 'API_REQUEST';
export const API_SUCCESS = 'API_SUCCESS';
export const API_FAILURE = 'API_FAILURE';

const makeApiRequest = (options) => {
  const { method = 'GET', path, query, requestAction, successAction,
    successCallback, failCallback, failAction, body, isFileUpload } = options;
  const endpoint = ['http://localhost:8081', path, query].join('');

  let headers;
  let requestBody;

  if (isFileUpload) {
    headers = {};
    requestBody = body;
  } else {
    headers = {
      'Content-Type': 'application/json',
    };
    requestBody = body && JSON.stringify(body);
  }

  let apiAction;

  return (dispatch) => {
    apiAction = {
      [CALL_API]: {
        method,
        endpoint,
        body: requestBody,
        headers,
        credentials: 'include',
        types: [
          {
            type: requestAction || API_REQUEST,
            payload: () => dispatch({ type: SHOW_LOADING }),
          },
          {
            type: successAction || API_SUCCESS,
            payload: (action, state, res) => {
              getJSON(res).then((json) => {
                dispatch({ type: HIDE_LOADING });
                if (successCallback) successCallback(json);

                return json;
              });
            },
          },
          {
            type: failAction || API_FAILURE,
            payload: (action, state, res) => {
              getJSON(res).then((json) => {
                const payload = new ApiError(res.status, res.statusText, json);

                dispatch({ type: HIDE_LOADING });
                dispatch({ type: failAction || API_FAILURE, payload });
                if (failCallback) failCallback(json);

                return payload;
              });
            },
          },
        ],
      },
    };

    return dispatch(apiAction);
  };
};

export default makeApiRequest;
