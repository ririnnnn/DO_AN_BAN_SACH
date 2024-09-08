import axios from "axios";
import { axiosJWT } from "./UserService";
import authorizedAxiosInstance from "../utils/authorizedAxios";

export const getContactAdmin = async (page, limit) => {
  const res = await authorizedAxiosInstance.get(
    `${process.env.REACT_APP_API}/contact?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getDetailContact = async (id) => {
  const res = await authorizedAxiosInstance.get(
    `${process.env.REACT_APP_API}/contact/${id}`
  );
  return res.data;
};

export const getContactUser = async (id) => {
  const res = await authorizedAxiosInstance.get(
    `${process.env.REACT_APP_API}/contact/get-contact/${id}`
  );
  return res.data;
};

export const createContact = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${process.env.REACT_APP_API}/contact`,
    data
  );
  return res.data;
};

export const updateContact = async (id, data) => {
  const res = await authorizedAxiosInstance.put(
    `${process.env.REACT_APP_API}/contact/${id}`,
    data
  );
  return res.data;
};

export const deleteContact = async (id) => {
  const res = await authorizedAxiosInstance.delete(
    `${process.env.REACT_APP_API}/contact/${id}`
  );
  return res.data;
};

export const deleteManyContact = async (ids) => {
  const res = await authorizedAxiosInstance.post(
    `${process.env.REACT_APP_API}/contact/delete-many-contact`,
    ids
  );
  return res.data;
};
