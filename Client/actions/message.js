import { GET_MESSAGE } from "../constants/actionTypes";
import * as api from "../api/index.js";

export const getMessage = ({ id }) => async (dispatch) => {
  try {
    const { data } = await api.getMessage(id);
    dispatch({ type: GET_MESSAGE, payload: data });
  } catch (error) {
    console.log({ requests: error.message });
  }
};
