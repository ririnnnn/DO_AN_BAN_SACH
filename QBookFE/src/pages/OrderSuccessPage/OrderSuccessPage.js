import { Form, Image } from "antd";
import {
  WrapperAllProduct,
  WrapperLeft,
  WrapperLeftProduct,
  WrapperMethodDelivery,
  WrapperOrderPage,
  WrapperProduct,
  WrapperProductName,
  WrapperRadioContent,
  WrapperRadioText,
  WrapperTitle,
} from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { addOrderItemsSelected } from "../../redux/slides/orderSlice";
import { useEffect, useState } from "react";
import { convertPrice } from "../../utils/utils";
import { useLocation, useNavigate } from "react-router-dom";

const OrderSuccessPage = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [stateUserDetail, setStateUserDetail] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
  });

  const [form] = Form.useForm();

  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { orderItemsSelected, delivery, priceTotalMemo, paymentMethod } =
    location.state;

  useEffect(() => {
    setStateUserDetail({
      name: user?.name,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
    });
  }, [user]);

  useEffect(() => {
    dispatch(addOrderItemsSelected({ checkedList }));
  }, [checkedList]);

  useEffect(() => {
    form.setFieldsValue(stateUserDetail);
  }, [form, stateUserDetail]);

  return (
    <div style={{ backgroundColor: "#f5f5fa" }}>
      <WrapperOrderPage>
        <WrapperTitle>Đơn hàng thành công</WrapperTitle>
        <div style={{ display: "flex" }}>
          <div style={{ width: "100%" }}>
            <WrapperLeft>
              <div style={{ padding: "20px 10px" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                  Phương thức giao hàng
                </span>
                <WrapperMethodDelivery>
                  <WrapperRadioContent>
                    <WrapperRadioText>{delivery}</WrapperRadioText> Giao hàng
                    tiết kiệm
                  </WrapperRadioContent>
                </WrapperMethodDelivery>
              </div>

              <div style={{ padding: "20px 10px" }}>
                <span style={{ fontSize: "1.5rem", fontWeight: 500 }}>
                  Hình thức thanh toán
                </span>
                <WrapperMethodDelivery>
                  <WrapperRadioContent>
                    <span>{paymentMethod}</span>
                  </WrapperRadioContent>
                </WrapperMethodDelivery>
              </div>
            </WrapperLeft>

            <WrapperLeftProduct>
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  padding: "0 0 10px 10px",
                }}
              >
                Sản phẩm đã đặt
              </span>
              {orderItemsSelected?.map((item, index) => (
                <WrapperAllProduct key={index}>
                  <WrapperProduct>
                    <div style={{ paddingLeft: "8px" }}>
                      <Image
                        src={item.image}
                        alt="image"
                        width={60}
                        height={60}
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                    <WrapperProductName>{item.name}</WrapperProductName>
                  </WrapperProduct>

                  <span>Giá tiền {`${convertPrice(item.price)} VND`}</span>

                  <span>Số lượng {item.amount}</span>
                </WrapperAllProduct>
              ))}
              <span
                style={{
                  fontSize: "1.5rem",
                  fontWeight: 500,
                  paddingLeft: "10px",
                  color: "#fe3834",
                }}
              >
                Tổng tiền: {`${convertPrice(priceTotalMemo)} VND`}
              </span>
            </WrapperLeftProduct>
          </div>
        </div>
      </WrapperOrderPage>
    </div>
  );
};

export default OrderSuccessPage;
