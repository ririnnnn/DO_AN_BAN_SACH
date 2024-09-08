import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllAuthor = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/author/get-all-author`
  );
  return res.data;
};

export const getDetailAuthor = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/author/${id}`);
  return res.data;
};

export const getAuthorAdmin = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/author?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createAuthor = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API}/author`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const updateAuthor = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API}/author/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteAuthor = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/author/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyAuthor = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/author/delete-many`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
