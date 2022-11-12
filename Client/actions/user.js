import {
  AUTH,
  GET_USER,
  UPDATE_USER,
  GET_USERS,
  PASS_FORGET,
} from "../constants/actionTypes";
import * as api from "../api/index.js";
import { useNavigation } from "@react-navigation/native";

export const register = (formData) => async (dispatch) => {
  try {
    const { data } = await api.register(formData);

    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const udpateUser = (user) => async (dispatch) => {
  try {
    const { data } = await api.updateUser(user);

    dispatch({ type: UPDATE_USER, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const signin = (formData) => async (dispatch) => {
  try {
    const { data } = await api.signin(formData);

    dispatch({ type: AUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};
export const getUser = (id) => async (dispatch) => {
  try {
    const { data } = await api.getUser(id);

    dispatch({ type: GET_USER, payload: data });
  } catch (error) {
    console.log({ user: message.error });
  }
};

export const getUsers = () => async (dispatch) => {
  try {
    const { data } = await api.getUsers();

    dispatch({ type: GET_USERS, payload: data });
  } catch (error) {
    console.log({ user: message.error });
  }
};

export const passForget = (formData) => async (dispatch) => {
  console.log(formData);
  try {
    const { data } = await api.passForget(formData);

    dispatch({ type: PASS_FORGET, payload: data });
  } catch (error) {
    console.log(error);
  }
};
