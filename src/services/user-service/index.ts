import ServerConfigs from "../../../configs/server.json";
import axios from "axios";

axios.defaults.withCredentials = true;

const getUserDetails = async () => {
  const response = await axios.get(`${ServerConfigs.apiUrl}/user`);
  return response.data;
};

const signup = async (username: string, password: string) => {
  const response = await axios.post(`${ServerConfigs.apiUrl}/signup`, {
    username,
    password,
  });
  return response.data;
};

const login = async (username: string, password: string) => {
  const response = await axios.post(`${ServerConfigs.apiUrl}/login`, {
    username,
    password,
  });
  return response.data;
};

const logout = async () => {
  const response = await axios.post(`${ServerConfigs.apiUrl}/logout`);
  return response.data;
};

export default {
  getUserDetails,
  signup,
  login,
  logout,
};
