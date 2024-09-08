import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllPublisher = async () => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/publisher/get-all-publisher`
  );
  return res.data;
};

export const getDetailPublisher = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/publisher/get-publisher/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getPublisherAdmin = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/publisher?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createPublisher = async (data, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/publisher/create-publisher`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updatePublisher = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API}/publisher/update-publisher/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deletePublisher = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/publisher/delete-publisher/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyPublisher = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/publisher/delete-many-publisher`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
