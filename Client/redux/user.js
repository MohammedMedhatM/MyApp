import {
  AUTH,
  LOGOUT,
  GET_USER,
  UPDATE_USER,
  GET_USERS,
} from "../constants/actionTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const userReducer = (state = [], action) => {
  switch (action.type) {
    case AUTH:
      const storeData = async () => {
        try {
          await AsyncStorage.setItem("profile", JSON.stringify(action.payload));
        } catch (e) {
          console.log(e);
        }
      };
      storeData();
      return { ...state, data: action.payload };
    case LOGOUT:
      return { ...state, authData: null };
    case GET_USER:
      return action.payload;
    case GET_USERS:
      return action.payload;
    case UPDATE_USER:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

export default userReducer;
