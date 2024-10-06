import axios from "axios";
import { axiosJWT } from "./UserService";
import authorizedAxiosInstance from "../utils/authorizedAxios";
export const getStatistic = async (
  groupBy,
  countBy,
  from,
  displayStatistic,
  access_token
) => {
  const res = await authorizedAxiosInstance.get(
    `${process.env.REACT_APP_API}/statistic?groupBy=${groupBy}&countBy=${countBy}&from=${from}&type=${displayStatistic}`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
