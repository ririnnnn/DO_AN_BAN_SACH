import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllGenre = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/genre/get-all-genre`
  );
  return res.data;
};

export const getDetailGenre = async (id) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/genre/get-genre/${id}`
  );
  return res.data;
};

export const getGenreAdmin = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/genre?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createGenre = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/genre/create-genre`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateGenre = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API}/genre/update-genre/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteGenre = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/genre/delete-genre/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyGenre = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/genre/delete-many-genre`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
