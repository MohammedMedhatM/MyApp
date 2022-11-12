import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API = axios.create({
  baseURL: "http://192.168.1.5:5000",
});

getMyObject = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem("profile");

    API.interceptors.request.use((req) => {
      if (jsonValue) {
        req.headers.Authorization = `Bearer ${JSON.parse(jsonValue).token}`;
      }

      return req;
    });
  } catch (e) {
    // read error
  }

  console.log("Done.");
};

getMyObject();

export const fetchPosts = (page) => API.get(`/posts?page=${page}`);
export const fetchPost = (id) => API.get(`/posts/${id}`);

export const postRequest = (request) => API.post("/request", request);
export const updateRequest = (info, id) => API.patch(`/request/${id}`, info);

export const getRequests = () => API.get("/request");
export const getRequest = (id) => API.get(`/request/${id}`);

export const updatePost = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const getMessage = (id) => API.get(`/message/${id}`);

export const signin = (formData) => API.post(`/user/signin`, formData);
export const register = (formData) => API.post(`/user/register`, formData);
export const passForget = (formData) => API.post(`/user/passForget`, formData);
export const getUser = (id) => API.get(`/user/${id}`);
export const getUsers = () => API.get(`/user`);
export const updateUser = (user) => API.patch(`/user/updateUser`, user);
