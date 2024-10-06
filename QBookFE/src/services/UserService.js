import axios from "axios";
import authorizedAxiosInstance from "../utils/authorizedAxios";

export const axiosJWT = axios.create();

export const loginUser = async (data) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/sign-in`,
    data
  );
  return res.data;
};

export const signupUser = async (data) => {
  console.log(data);
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/sign-up`,
    data
  );
  return res.data;
};

export const logOutUser = async () => {
  const res = await axios.post(`${process.env.REACT_APP_API}/user/log-out`);
  return res.data;
};

export const getUserDetail = async (id) => {
  const res = await authorizedAxiosInstance.get(
    `${process.env.REACT_APP_API}/user/${id}`
  );

  return res.data;
};

export const updateUser = async (id, data) => {
  const res = await authorizedAxiosInstance.put(
    `${process.env.REACT_APP_API}/user/${id}`,
    data
  );

  return res.data;
};

export const refreshToken = async (refresh_token) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/user/refresh-token`,
    {
      // withCredentials: true,
    },
    {
      headers: {
        token: `Bearer ${refresh_token}`,
      },
    }
  );
  return res.data;
};

export const refreshTokenAPI = async (refreshToken) => {
  const res = await axios.put(
    `${process.env.REACT_APP_API}/user/refresh-token`,
    { refreshToken }
  );
  return res.data;
};

export const getAllUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/user/get-all-user`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getUserAdmin = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/user?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const deleteUser = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/user/delete-user/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyUser = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/user/delete-many`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const changePassword = async (userId, data) => {
  const res = await authorizedAxiosInstance.put(
    `${process.env.REACT_APP_API}/user/change-password/${userId}`,
    data
  );

  return res.data;
};

export const getCountUser = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/user/get-count-user`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
