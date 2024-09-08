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

const OrderDetailPage = () => {
  const params = useParams();
  const { id } = params;
  const location = useLocation();
  const { token } = location.state;

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

  return (
    <Loading isLoading={isLoading}>
      <div style={{ width: "100%", height: "100vh", background: "#f5f5fa" }}>
        <WrapperOrderDetailPage>
          <WrapperStyleTitle>
            Chi tiết đơn hàng{" "}
            <span
              style={{ color: "rgb(255, 66, 78)" }}
            >{`DH${data?._id}`}</span>
          </WrapperStyleTitle>
          <WrapperHeaderUser>
            <WrapperInfoUser>
              <WrapperLabel>Địa chỉ người nhận</WrapperLabel>
              <WrapperContentInfo>
                <div className="name-info">
                  <span>Tên người nhận: </span>
                  <span>{data?.shippingAddress?.fullName}</span>
                </div>
                <div className="order-inf">
                  <span>Địa chỉ: </span>
                  <span>
                    {`${data?.shippingAddress?.address}, ${data?.shippingAddress?.city}`}
                  </span>
                </div>
                <div
                  className="order-inf"
                  style={{ fontSize: "1.5rem", padding: "5px 0" }}
                >
                  <span>Điện thoại: </span>
                  <span>{`+84 ${data?.shippingAddress?.phone}`}</span>
                </div>
                <div
                  className="order-inf"
                  style={{ fontSize: "1.5rem", padding: "5px 0" }}
                >
                  <span>Ngày đặt: </span>
                  <span>{convertDate(data?.createdAt)}</span>
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức giao hàng</WrapperLabel>
              <WrapperContentInfo>
                <div style={{ fontSize: "1.5rem", marginTop: 0 }}>
                  <span className="name-delivery">{data?.deliveryMethod} </span>
                  Giao hàng tiết kiệm
                </div>
                <div className="delivery-fee" style={{ fontSize: "1.5rem" }}>
                  <span>Phí giao hàng: </span>
                  <WrapperShippingPrice>{`${data?.shippingPrice} VND`}</WrapperShippingPrice>
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
            <WrapperInfoUser>
              <WrapperLabel>Hình thức thanh toán</WrapperLabel>
              <WrapperContentInfo>
                <div style={{ fontSize: "1.5rem" }}>{data?.paymentMethod}</div>
                <div className="status-payment">
                  {data?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"}
                </div>
              </WrapperContentInfo>
            </WrapperInfoUser>
          </WrapperHeaderUser>
          <WrapperStyleContent>
            <div
              style={{
                fontSize: "1.5rem",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div style={{ width: "662px" }}>Sản phẩm</div>
              <WrapperItemLabel>Giá</WrapperItemLabel>
              <WrapperItemLabel>Số lượng</WrapperItemLabel>
              <WrapperItemLabel>Giảm giá</WrapperItemLabel>
            </div>
            {data?.orderItems?.map((item, index) => {
              return (
                <WrapperProduct key={index}>
                  <WrapperNameProduct>
                    <img
                      src={item?.image}
                      alt=""
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "cover",
                        border: "1px solid rgb(238, 238, 238)",
                        padding: "2px",
                      }}
                    />
                    <div
                      style={{
                        width: 260,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        marginLeft: "10px",
                        height: "70px",
                      }}
                    >
                      {item?.name}
                    </div>
                  </WrapperNameProduct>
                  <WrapperItem>{`${convertPrice(
                    item?.price
                  )} VND`}</WrapperItem>
                  <WrapperItem style={{ paddingLeft: "6px" }}>
                    {item?.amount}
                  </WrapperItem>
                  <WrapperItem style={{ paddingLeft: "8px" }}>
                    {item?.discount
                      ? `${convertPrice(
                          item?.price * item?.amount * (item?.discount / 100)
                        )} VND`
                      : "0 VND"}
                  </WrapperItem>
                </WrapperProduct>
              );
            })}

            <WrapperAllPrice>
              <WrapperItemLabel>Tạm tính</WrapperItemLabel>
              <WrapperItem>{`${convertPrice(priceMemo)} VND`}</WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Phí vận chuyển</WrapperItemLabel>
              <WrapperItem>
                {`${convertPrice(data?.shippingPrice) || 0} VND`}
              </WrapperItem>
            </WrapperAllPrice>
            <WrapperAllPrice>
              <WrapperItemLabel>Tổng cộng</WrapperItemLabel>
              <WrapperItem>
                <WrapperItem>{`${convertPrice(
                  data?.totalPrice
                )} VND`}</WrapperItem>
              </WrapperItem>
            </WrapperAllPrice>
          </WrapperStyleContent>
        </WrapperOrderDetailPage>
      </div>
    </Loading>
  );
};

export default OrderDetailPage;
