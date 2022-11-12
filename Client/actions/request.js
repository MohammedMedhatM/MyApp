import {
  POST_REQUEST,
  GET_REQUESTS,
  GET_REQUEST,
  UPDATE_REQUEST,
} from "../constants/actionTypes";
import * as api from "../api/index.js";

export const postRequest = (request) => async (dispatch) => {
  try {
    const { data } = await api.postRequest(request);
    dispatch({ type: POST_REQUEST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateRequest = (info, id) => async (dispatch) => {
  try {
    const { data } = await api.updateRequest(info, id);
    dispatch({ type: UPDATE_REQUEST, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const getRequests = () => async (dispatch) => {
  try {
    const { data } = await api.getRequests();
    dispatch({ type: GET_REQUESTS, payload: data });
  } catch (error) {
    console.log({ requests: error.message });
  }
};

export const getRequest = (id) => async (dispatch) => {
  try {
    const { data } = await api.getRequest(id);
    dispatch({ type: GET_REQUEST, payload: data });
  } catch (error) {
    console.log({ request: error.message });
  }
};
