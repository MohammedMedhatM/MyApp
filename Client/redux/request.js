import {
  POST_REQUEST,
  GET_REQUESTS,
  GET_REQUEST,
  UPDATE_REQUEST,
} from "../constants/actionTypes";

const requestReducer = (state = [], action) => {
  switch (action.type) {
    case POST_REQUEST:
      return { ...state, data: action.payload };

    case GET_REQUESTS:
      return { ...state, requests: action.payload };
    case GET_REQUEST:
      return { ...state, request: action.payload };
    case UPDATE_REQUEST:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default requestReducer;
