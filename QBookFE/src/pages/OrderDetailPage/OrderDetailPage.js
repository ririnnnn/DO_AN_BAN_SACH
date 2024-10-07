import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as OrderService from "../../services/OrderService";
import { convertDate, convertPrice } from "../../utils/utils";

import {
  WrapperAllPrice,
  WrapperContentInfo,
  WrapperHeaderUser,
  WrapperInfoUser,
  WrapperItem,
  WrapperItemLabel,
  WrapperLabel,
  WrapperNameProduct,
  WrapperOrderDetailPage,
  WrapperProduct,
  WrapperShippingPrice,
  WrapperStyleContent,
  WrapperStyleTitle,
} from "./styles";
import { Table } from "antd";

const OrderDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { token } = localStorage.getItem("access_token");

  const fetchOrderDetail = async () => {
    const res = await OrderService.getOrderDetail(id, token);
    return res.data;
  };

  const queryOrderDetail = useQuery(
    {
      queryKey: ["order-detail"],
      queryFn: fetchOrderDetail,
    },
    {
      enabled: id && token,
    }
  );

  const { isLoading, data } = queryOrderDetail;

  const priceMemo = useMemo(() => {
    const result = data?.orderItems?.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    return result;
  }, [data]);

  const HTGH = {
    GHTK: "Giao hàng tiết kiệm",
    GHN: "Giao hàng nhanh",
  };
  const columns = [
    {
      title: "Sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          alt={image}
          src={image}
          width="100px"
          height="100px"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Đơn giá",
      dataIndex: "price",
      render: (price) => {
        return `${convertPrice(price)} VND`;
      },
    },
    {
      title: "Giảm giá",
      dataIndex: "discount",
      render: (_, item) => {
        return item?.discount
          ? `${convertPrice(item?.price * (item?.discount / 100))} VND`
          : "0 VND";
      },
    },
    {
      title: "Số lượng",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Thành tiền",
      dataIndex: "price",
      render: (_, record) => {
        const total =
          record.price * record.amount -
          ((record.price * record.discount) / 100) * record.amount;
        return `${convertPrice(total)} VND`;
      },
    },
  ];
  return (
    <Loading isLoading={isLoading}>
      <div className="w-full h-screen bg-[f5f5fa]">
        <WrapperOrderDetailPage>
          <label className="text-xl font-bold">
            Chi tiết đơn hàng số:{" "}
            <span className="text-red-600">{data?._id}</span>
          </label>
          <div className="bg-stone-100 rounded-lg p-2 text-xl my-2">
            <label className="font-bold text-xl">Thông tin nhận hàng</label>
            <div className="flex">
              <div className="w-[33%]">
                Tên người nhận: {data?.shippingAddress?.fullName}
              </div>
              <div className="w-[33%]">
                Địa chỉ:{" "}
                {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city}`}
              </div>
              <div className="w-[33%]">
                Điện thoại: {`+84 ${data?.shippingAddress?.phone}`}
              </div>
            </div>
          </div>
          <div className="bg-stone-100 rounded-lg p-2 text-xl my-2">
            <label className="font-bold text-xl">Thông tin đơn hàng</label>
            <div className="flex">
              <div className="w-[33%]">
                Ngày đặt: {convertDate(data?.createdAt)}
              </div>
              <div className="w-[33%]">
                Hình thức giao hàng: {HTGH[data?.deliveryMethod]}
              </div>
              <div className="w-[33%]">
                Hình thức thanh toán: {data?.paymentMethod}
              </div>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={data?.orderItems}
            pagination={false}
          ></Table>
          <div className="flex justify-end text-xl font-bold px-5 py-2">
            <div className="w-fit">
              <div className="w-fit">
                Thành giá:{" "}
                <span className="text-red-600">{`${convertPrice(
                  data?.itemsPrice
                )} VND`}</span>
              </div>
              <div className="w-fit">
                Phí vận chuyển:{" "}
                <span className="text-red-600">{`${convertPrice(
                  data?.shippingPrice
                )} VND`}</span>
              </div>
              <div className="w-fit">
                Tổng tiền:{" "}
                <span className="text-red-600">{`${convertPrice(
                  data?.totalPrice
                )} VND`}</span>
              </div>
            </div>
          </div>
        </WrapperOrderDetailPage>
      </div>
    </Loading>
  );
};

export default OrderDetailPage;
