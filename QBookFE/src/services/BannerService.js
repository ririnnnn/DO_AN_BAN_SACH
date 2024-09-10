import axios from "axios";
import authorizedAxiosInstance from "../utils/authorizedAxios";

export const getBannerDisplay = async (limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/banner?limit=${limit}`
  );
  return res.data;
};

export const createBanner = async (data) => {
  const res = await authorizedAxiosInstance.post(
    `${process.env.REACT_APP_API}/banner`,
    data
  );
  return res.data;
};

export const getBanner = async (page, limit) => {
  const res = await authorizedAxiosInstance.get(
    `${process.env.REACT_APP_API}/banner?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const getDetailBanner = async (BannerId) => {
  const res = await authorizedAxiosInstance.get(
    `${process.env.REACT_APP_API}/banner/${BannerId}`
  );
  return res.data;
};

export const updateBanner = async (BannerId, data) => {
  const res = await authorizedAxiosInstance.put(
    `${process.env.REACT_APP_API}/banner/${BannerId}`,
    data
  );
  return res.data;
};

export const deleteBanner = async (BannerId) => {
  const res = await authorizedAxiosInstance.delete(
    `${process.env.REACT_APP_API}/banner/${BannerId}`
  );
  return res.data;
};

export const deleteManyBanner = async (BannerIds) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/banner/delete-many`,
    BannerIds
  );
  return res.data;
};
