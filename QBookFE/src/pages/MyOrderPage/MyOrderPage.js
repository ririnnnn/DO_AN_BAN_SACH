import { Pagination, Segmented } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import Loading from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import { sortDate } from "../../utils/sorts";
import { convertDate, convertPrice } from "../../utils/utils";
import {
  WrapperContainer,
  WrapperFooterItem,
  WrapperHeaderItem,
  WrapperItemOrder,
  WrapperListOrder,
  WrapperMyOrderPage,
  WrapperStatus,
  WrapperStatusContent,
  WrapperStatusTitle,
  WrapperStyleTitle,
} from "./styles";

const MyOrderPage = () => {
  const [selectedValue, setSelectedValue] = useState("Tất cả");
  const [dataOrders, setDataOrders] = useState([]);
  const [isLoadingDataOrders, setIsLoadingDataOrders] = useState(false);
  const [pageValue, setPageValue] = useState(1);
  const [totalOrder, setTotalOrder] = useState(10);

  const user = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();
  const { id, token } = location.state;

  const mutationDelete = useMutationHook(
    ({ id, access_token, orderItems, email }) => {
      const res = OrderService.deleteOrder(id, access_token, orderItems, email);
      return res;
    }
  );

  const {
    data: dataDelete,
    isSuccess: isSuccessDelete,
    isError: isErrorDelete,
    isLoading: isLoadingDelete,
  } = mutationDelete;

  useEffect(() => {
    const fetchAllOrder = async () => {
      setIsLoadingDataOrders(true);
      const res = await OrderService.getOrder(
        id,
        token,
        selectedValue,
        pageValue
      );
      setDataOrders(res?.data);
      setTotalOrder(res?.totalOrder);
      setIsLoadingDataOrders(false);
    };

    fetchAllOrder();
  }, [selectedValue, pageValue, isSuccessDelete]);

  useEffect(() => {
    if (isSuccessDelete) {
      Message.success("Xóa đơn hàng thành công!");
    } else if (isErrorDelete && dataDelete?.status === "ERROR") {
      Message.error("Xóa đơn hàng thất bại!");
    }
  }, [isSuccessDelete]);

  const handleOrderDetail = (id) => {
    navigate(`/order-detail/${id}`, {
      state: {
        token: token,
      },
    });
  };

  const renderOrder = (orderItems) => {
    return orderItems?.map((order, index) => {
      return (
        <WrapperHeaderItem key={index}>
          <img
            src={order?.image}
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
              fontSize: "1.6rem",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              marginLeft: "10px",
            }}
          >
            {order?.name}
          </div>
          <span
            style={{
              fontSize: "1.6rem",
              fontWeight: "bold",
              color: "rgb(255, 66, 78)",
              marginLeft: "auto",
            }}
          >
            {`${convertPrice(order?.price)}₫`}
          </span>
        </WrapperHeaderItem>
      );
    });
  };

  const handleDeleteOrder = (order) => {
    const orderId = order?._id;
    if (window.confirm(`Bạn có muốn xóa đơn hàng có mã DH${orderId} không?`)) {
      mutationDelete.mutate({
        id: orderId,
        access_token: user?.access_token,
        orderItems: order?.orderItems,
        email: order?.shippingAddress?.email,
      });
    }
  };

  const handleOnChangeSegmented = (value) => {
    setSelectedValue(value);
  };

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  return (
    <Loading isLoading={isLoadingDataOrders || isLoadingDelete}>
      <WrapperContainer>
        <WrapperMyOrderPage>
          <WrapperStyleTitle>Đơn hàng của tôi</WrapperStyleTitle>
          <WrapperListOrder>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Segmented
                  defaultValue={selectedValue}
                  options={[
                    "Tất cả",
                    "Chờ giao hàng",
                    "Đang giao hàng",
                    "Đã giao hàng",
                  ]}
                  onChange={handleOnChangeSegmented}
                  size="large"
                />
              </div>
              <div>
                <Pagination
                  defaultCurrent={pageValue}
                  total={totalOrder}
                  pageSize={5}
                  onChange={handleOnChangePage}
                />
              </div>
            </div>
            {dataOrders?.length > 0 ? (
              sortDate(dataOrders)?.map((item, index) => {
                return (
                  <WrapperItemOrder key={item?._id}>
                    <WrapperStatus>
                      <div className="flex m-2">
                        <div className="w-1/2 min-w[300px]">
                          <span className="text-lg">Mã đơn hàng: </span>
                          <span className="text-lg text-red-800 font-semibold">{`DH${item?._id}`}</span>
                        </div>
                        <div className="w-1/2 min-w[300px]">
                          <span className="text-lg">Trạng thái </span>
                          <span className="text-lg  font-semibold">
                            {item?.isDelivered}
                          </span>
                        </div>
                      </div>
                      <div className="flex m-2">
                        <div className="w-1/2 min-w[300px]">
                          <span className="text-lg">Ngày đặt: </span>
                          <span className="text-lg  font-semibold">
                            {convertDate(item?.createdAt)}
                          </span>
                        </div>
                        <div className="w-1/2 min-w[300px]">
                          <span className="text-lg">Thanh toán: </span>
                          <span className="text-lg  font-semibold">
                            {`${
                              item?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                            }`}
                          </span>
                        </div>
                      </div>
                      {/* <WrapperStatusContent>
                        <span className="text-lg">Mã đơn hàng: </span>
                        <span className="text-lg">{`DH${item?._id}`}</span>
                      </WrapperStatusContent>
                      <WrapperStatusContent>
                        <span>Giao hàng: </span>
                        <span>{item?.isDelivered}</span>
                      </WrapperStatusContent>
                      <WrapperStatusContent>
                        <span>Thanh toán: </span>
                        <span>
                          {`${
                            item?.isPaid ? "Đã thanh toán" : "Chưa thanh toán"
                          }`}
                        </span>
                      </WrapperStatusContent>
                      <WrapperStatusContent>
                        <span>Ngày đặt: </span>
                        <span>{convertDate(item?.createdAt)}</span>
                      </WrapperStatusContent> */}
                    </WrapperStatus>
                    {/* {renderOrder(item?.orderItems)} */}
                    <WrapperFooterItem>
                      <div>
                        <span
                          style={{
                            fontSize: "1.6rem",
                            color: "rgb(255, 66, 78)",
                            fontWeight: "bold",
                          }}
                        >
                          Tổng tiền:{" "}
                        </span>
                        <span
                          style={{
                            fontSize: "1.6rem",
                            color: "rgb(255, 66, 78)",
                            fontWeight: 700,
                          }}
                        >
                          {`${convertPrice(item?.totalPrice)}₫`}
                        </span>
                      </div>
                      <div style={{ display: "flex", gap: "10px" }}>
                        {item?.isDelivered === "Chờ giao hàng" ? (
                          <ButtonComponent
                            onClick={() => handleDeleteOrder(item)}
                            size={40}
                            styleButton={{
                              height: "36px",
                              border: "1px solid rgb(11, 116, 229)",
                              borderRadius: "4px",
                            }}
                            buttonText="Hủy đơn hàng"
                            styleTextButton={{
                              color: "rgb(11, 116, 229)",
                              fontSize: "14px",
                            }}
                          ></ButtonComponent>
                        ) : null}
                        <ButtonComponent
                          onClick={() => handleOrderDetail(item?._id)}
                          size={40}
                          styleButton={{
                            height: "36px",
                            border: "1px solid rgb(11, 116, 229)",
                            borderRadius: "4px",
                          }}
                          buttonText="Xem chi tiết"
                          styleTextButton={{
                            color: "rgb(11, 116, 229)",
                            fontSize: "14px",
                          }}
                        ></ButtonComponent>
                      </div>
                    </WrapperFooterItem>
                  </WrapperItemOrder>
                );
              })
            ) : (
              <span>Chưa có đơn hàng nào...</span>
            )}
          </WrapperListOrder>
        </WrapperMyOrderPage>
      </WrapperContainer>
    </Loading>
  );
};

export default MyOrderPage;
