import axios from "axios";
import { axiosJWT } from "./UserService";

export const createOrder = async (data, access_token) => {
  const res = await axiosJWT.post(`${process.env.REACT_APP_API}/order`, data, {
    headers: {
      token: `Bearer ${access_token}`,
    },
  });
  return res.data;
};

export const getOrder = async (id, access_token, delivery, page) => {
  let typeDelivery = "";

  if (delivery === "Tất cả") {
    typeDelivery = "all";
  }

  if (delivery === "Chờ giao hàng") {
    typeDelivery = "wait";
  }

  if (delivery === "Đang giao hàng") {
    typeDelivery = "delivering";
  }

  if (delivery === "Đã giao hàng") {
    typeDelivery = "delivered";
  }

  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/order/get-order/${id}?delivery=${typeDelivery}&page=${page}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );

  return res.data;
};

export const getOrderDetail = async (id, access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/order/get-order-detail/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteOrder = async (id, access_token, orderItems, email) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/order/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
      data: {
        orderItems,
        email,
      },
    }
  );
  return res.data;
};

export const getAllOrder = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/order/get-all-order`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyOrder = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/order/delete-many`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const updateOrder = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API}/order/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getCountOrder = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/order/get-count-order`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getTotalPrice = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/order/get-total-price`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getOrderAdmin = async (access_token, page, limit) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/order?page=${page}&limit=${limit}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};
