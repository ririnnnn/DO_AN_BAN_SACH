import axios from "axios";
import { axiosJWT } from "./UserService";

export const getAllProduct = async (limit, search) => {
  if (search) {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/product/get-all?filter=name&filter=${search}&limit=${limit}`
    );
    return res.data;
  } else if (limit) {
    const res = await axios.get(
      `${process.env.REACT_APP_API}/product/get-all?limit=${limit}`
    );
    return res.data;
  } else {
    const res = await axios.get(`${process.env.REACT_APP_API}/product/get-all`);
    return res.data;
  }
};

export const getProductAdmin = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const createProduct = async (data) => {
  const res = await axios.post(`${process.env.REACT_APP_API}/product`, data);
  return res.data;
};

export const getDetailProduct = async (id) => {
  const res = await axios.get(`${process.env.REACT_APP_API}/product/${id}`);
  return res.data;
};

export const updateProduct = async (id, data, access_token) => {
  const res = await axiosJWT.put(
    `${process.env.REACT_APP_API}/product/${id}`,
    data,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteProduct = async (id, access_token) => {
  const res = await axiosJWT.delete(
    `${process.env.REACT_APP_API}/product/${id}`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const deleteManyProduct = async (ids, access_token) => {
  const res = await axiosJWT.post(
    `${process.env.REACT_APP_API}/product/delete-many`,
    ids,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getAllType = async () => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/get-all-type`
  );
  return res.data;
};

export const getAllProductType = async (
  genre,
  limit,
  page,
  publisher,
  typeSort,
  ratingValue
) => {
  const publisherId =
    publisher?.length > 0 ? `&publisher=${publisher.join(",")}` : "";
  const sort = typeSort ? `&sort=${typeSort}` : "";
  const rating = ratingValue ? `&rating=${ratingValue}` : "";
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/get-all?filter=genreId&filter=${genre}&limit=${limit}&page=${page}&publisher=publisherId${publisherId}${sort}${rating}`
  );
  return res.data;
};

export const getCountProduct = async (access_token) => {
  const res = await axiosJWT.get(
    `${process.env.REACT_APP_API}/product/get-count-product`,
    {
      headers: {
        token: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
};

export const getProductAuthor = async (
  authorId,
  limit,
  page,
  publisher,
  typeSort,
  ratingValue
) => {
  const publisherID =
    publisher?.length > 0 ? `&publisher=${publisher.join(",")}` : "";
  const sort = typeSort ? `&sort=${typeSort}` : "";
  const rating = ratingValue ? `&rating=${ratingValue}` : "";
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/get-product-author?filter=authorId&filter=${authorId}&limit=${limit}&page=${page}&publisher=publisherId${publisherID}${sort}${rating}`
  );
  return res.data;
};

export const getBestSeller = async (page, limit) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/get-product-best-seller?page=${page}&limit=${limit}`
  );
  return res.data;
};

export const ratingProduct = async (productId, userId, rating) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API}/product/${productId}/rate`,
    { userId, rating }
  );
  return res.data;
};

export const getProductSearch = async (query) => {
  const res = await axios.get(
    `${process.env.REACT_APP_API}/product/search?q=${query}`
  );
  return res.data;
};
