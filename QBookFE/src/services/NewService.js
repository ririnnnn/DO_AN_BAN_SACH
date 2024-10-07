import axios from "axios";
import authorizedAxiosInstance from "../utils/authorizedAxios";

export const createNew = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/new`, data);
  return res.data;
};

export const getNew = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/new?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getDetailNew = async (newId) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/new/${newId}`);
  return res.data;
};

export const updateNew = async (newId, data) => {
  const res = await authorizedAxiosInstance.put(
    `${process.env.REACT_APP_API}/new/${newId}`,
    data
  );
  return res.data;
};

export const deleteNew = async (newId) => {
  const res = await authorizedAxiosInstance.delete(
    `${process.env.REACT_APP_API}/new/${newId}`
  );
  return res.data;
};

export const deleteManyNew = async (newIds) => {
  const res = await authorizedAxiosInstance.post(
    `${process.env.REACT_APP_API}/new/delete-many`,
    newIds
  );
  return res.data;
};
