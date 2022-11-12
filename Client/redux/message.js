import { GET_MESSAGE } from "../constants/actionTypes";

const requestReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MESSAGE:
      return action.payload;

    default:
      return state;
  }
};

export default requestReducer;
