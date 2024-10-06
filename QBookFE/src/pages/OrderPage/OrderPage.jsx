import { Button, Checkbox, Form, Image, InputNumber } from "antd";
import {
  WrapperAllProduct,
  WrapperCaculator,
  WrapperLeft,
  WrapperLeftProduct,
  WrapperOrderPage,
  WrapperProduct,
  WrapperProductLeftButton,
  WrapperProductName,
  WrapperProductRightButton,
  WrapperRight,
  WrapperStep,
  WrapperTitle,
  WrapperTotal,
  WrapperTotalPrice,
} from "./styles";
import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  removeProduct,
  removeMoreProduct,
  setNumberProduct,
  increaseProduct,
  decreaseProduct,
  addOrderItemsSelected,
} from "../../redux/slides/orderSlice";
import { useEffect, useMemo, useState } from "react";
import { convertPrice } from "../../utils/utils";
import * as Message from "../../components/Message/Message";
import ModalComponent from "../../components/ModalComponent/ModalComponent";
import InputComponent from "../../components/InputComponent/InputComponent";
import useMutationHook from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import { updateUser } from "../../redux/slides/userSlice";
import { useLocation, useNavigate } from "react-router-dom";
import StepsComponent from "../../components/StepsComponent/StepsComponent";

const OrderPage = () => {
  const [checkedList, setCheckedList] = useState([]);
  const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false);
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

  const onChangeCheckBox = (e) => {
    if (e.target.checked) {
      const newCheckedList = [...checkedList, e.target.value];
      setCheckedList(newCheckedList);
    } else {
      const newCheckedList = checkedList.filter(
        (item) => item !== e.target.value
      );
      setCheckedList(newCheckedList);
    }
  };

  const onChangeCheckBoxAll = (e) => {
    if (e.target.checked) {
      let newCheckedList = [];
      order?.orderItems?.forEach((item) => newCheckedList.push(item.product));
      setCheckedList(newCheckedList);
    } else {
      setCheckedList([]);
    }
  };

  const handleOnChangeNumberProduct = (type, productId, check) => {
    if (type === "increase") {
      if (!check) {
        dispatch(increaseProduct({ productId }));
      } else {
        alert("Số lượng sản phẩm trong kho đã hết!");
      }
    } else if (type === "decrease") {
      dispatch(decreaseProduct({ productId }));
    } else {
      if (!check) {
        dispatch(setNumberProduct({ type, productId }));
      } else {
        alert("Số lượng sản phẩm trong kho đã hết!");
      }
    }
  };

  const handleDeleteProduct = (productId) => {
    dispatch(removeProduct({ productId }));
    setCheckedList([]);
  };

  const handleDeleteMoreProduct = () => {
    dispatch(removeMoreProduct({ checkedList }));
    setCheckedList([]);
  };

  const priceMemo = useMemo(() => {
    const result = order.orderItemsSelected.reduce((total, item) => {
      return total + item.price * item.amount;
    }, 0);
    return result;
  }, [order]);

  const priceDiscountMemo = useMemo(() => {
    const result = order.orderItemsSelected.reduce((total, item) => {
      return total + item.price * item.amount * (item.discount / 100);
    }, 0);
    return result;
  }, [order]);

  const priceDeliveryMemo = useMemo(() => {
    if (priceMemo >= 200000 && priceMemo <= 500000) {
      return 10000;
    } else if (priceMemo === 0 || priceMemo > 500000) {
      return 0;
    } else {
      return 20000;
    }
  }, [priceMemo]);

  const priceTotalMemo = useMemo(() => {
    return priceMemo - priceDiscountMemo + priceDeliveryMemo;
  }, [priceMemo, priceDiscountMemo, priceDeliveryMemo]);

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = UserService.updateUser(id, data, access_token);
    return res;
  });

  const { isSuccess, data } = mutationUpdate;

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

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success("Cập nhật thông tin người dùng thành công!");
      dispatch(
        updateUser({
          ...data?.data,
          name: data?.data.name,
          phone: data?.data.phone,
          address: data?.data.address,
          city: data?.data.city,
          access_token: user?.access_token,
        })
      );
      setStateUserDetail({
        name: data?.data.name,
        phone: data?.data.phone,
        address: data?.data.address,
        city: data?.data.city,
      });
      setIsOpenModalUpdateInfo(false);
    } else if (data?.status === "ERROR") {
      Message.error(data?.message);
      setIsOpenModalUpdateInfo(false);
    }
  }, [isSuccess]);

  const handleBuyProduct = () => {
    if (checkedList.length === 0) {
      Message.error("Vui lòng chọn ít nhất một sản phẩm!");
    } else if (!user.name || !user.address || !user.phone || !user.city) {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/payment", {
        state: {
          priceMemo,
          priceDiscountMemo,
          priceDeliveryMemo,
          priceTotalMemo,
          orderItemsSelected: order?.orderItemsSelected,
        },
      });
    }
  };

  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    setIsOpenModalUpdateInfo(false);
  };

  const handleUpdateUser = () => {
    mutationUpdate.mutate({
      id: user?.id,
      data: stateUserDetail,
      access_token: user?.access_token,
    });
  };

  const handleChangeAddress = () => {
    if (user?.email !== "") {
      setIsOpenModalUpdateInfo(true);
    } else {
      navigate("/");
    }
  };

  const itemss = [
    {
      title: "20.000 VND",
      description: "Dưới 200.000 VND",
    },
    {
      title: "10.000 VND",
      description: "Từ 200.000 VND đến 500.000 VND",
    },
    {
      title: "Free ship",
      description: "Trên 500.000 VND",
    },
  ];

  return (
    <div style={{ backgroundColor: "#f5f5fa" }}>
      <WrapperOrderPage>
        <WrapperTitle>Giỏ hàng</WrapperTitle>

        <div style={{ display: "flex" }}>
          <div>
            <WrapperStep>
              <div
                style={{
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  paddingBottom: "20px",
                }}
              >
                Phí giao hàng
              </div>
              <StepsComponent
                current={
                  priceDeliveryMemo === 20000 ||
                  order?.orderItemsSelected.length === 0
                    ? 0
                    : priceDeliveryMemo === 10000
                    ? 1
                    : 2
                }
                items={itemss}
              />
            </WrapperStep>
            <WrapperLeft>
              <WrapperAllProduct>
                <div style={{ width: "300px" }}>
                  <Checkbox
                    onChange={onChangeCheckBoxAll}
                    checked={checkedList.length === order?.orderItems?.length}
                  >
                    Tất cả ({order?.orderItems?.length} sản phẩm)
                  </Checkbox>
                </div>
                <span>Đơn giá gốc</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteMoreProduct()}
                >
                  {checkedList.length > 0 && <DeleteOutlined />}
                </div>
              </WrapperAllProduct>
            </WrapperLeft>

            {order?.orderItems?.map((item, index) => (
              <WrapperLeftProduct key={index}>
                <WrapperAllProduct>
                  <WrapperProduct>
                    <Checkbox
                      onChange={onChangeCheckBox}
                      checked={checkedList.includes(item.product)}
                      value={item.product}
                    ></Checkbox>
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

                  <span>{convertPrice(item.price)}</span>

                  <div style={{ border: "1px solid #ccc" }}>
                    <WrapperProductLeftButton
                      onClick={() =>
                        handleOnChangeNumberProduct("decrease", item.product)
                      }
                    >
                      <MinusOutlined />
                    </WrapperProductLeftButton>
                    <InputNumber
                      defaultValue={item.amount}
                      value={item.amount}
                      style={{
                        width: "60px",
                        border: "none",
                        margin: "auto",
                        top: "1px",
                      }}
                      onChange={(e) => {
                        handleOnChangeNumberProduct(e, item.product);
                      }}
                      min={1}
                      max={item.countInStock}
                    />
                    <WrapperProductRightButton
                      onClick={() =>
                        handleOnChangeNumberProduct(
                          "increase",
                          item.product,
                          item.amount === item.countInStock ||
                            item.amount > item.countInStock
                        )
                      }
                    >
                      <PlusOutlined />
                    </WrapperProductRightButton>
                  </div>

                  <span>{convertPrice(item.price * item.amount)}</span>

                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleDeleteProduct(item.product)}
                  >
                    <DeleteOutlined />
                  </div>
                </WrapperAllProduct>
              </WrapperLeftProduct>
            ))}
          </div>

          <div>
            <WrapperRight>
              <div>
                Địa chỉ:{" "}
                <span
                  style={{ fontWeight: 500 }}
                >{`${user?.address}, ${user?.city}`}</span>{" "}
                <span
                  style={{ color: "#007fff", cursor: "pointer" }}
                  onClick={handleChangeAddress}
                >
                  Thay đổi
                </span>
              </div>

              <div style={{ padding: "20px 0 30px" }}>
                <WrapperCaculator>
                  <label>Tạm tính</label>
                  <div>{`${convertPrice(priceMemo) || 0} VND`}</div>
                </WrapperCaculator>
                <WrapperCaculator>
                  <label>Giảm giá</label>
                  <div>{`${convertPrice(priceDiscountMemo) || 0} VND`}</div>
                </WrapperCaculator>
                <WrapperCaculator>
                  <label>Phí giao hàng</label>
                  <div>{`${convertPrice(priceDeliveryMemo) || 0} VND`}</div>
                </WrapperCaculator>
              </div>

              <WrapperTotalPrice>
                <span>Tổng tiền</span>
                <div>
                  <WrapperTotal>{`${
                    convertPrice(priceTotalMemo) || 0
                  } VND`}</WrapperTotal>{" "}
                  <div>(Đã bao gồm VAT nếu có)</div>
                </div>
              </WrapperTotalPrice>
            </WrapperRight>
            <div style={{ paddingTop: "30px" }}>
              <ButtonComponent
                buttonText="Mua hàng"
                onClick={handleBuyProduct}
                styleButton={{
                  backgroundColor: "rgb(255, 66, 78)",
                  width: "100%",
                  height: "48px",
                  border: "none",
                }}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              />
            </div>
          </div>
        </div>
      </WrapperOrderPage>

      <ModalComponent
        title="Cập nhật thông tin giao hàng"
        open={isOpenModalUpdateInfo}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleUpdateUser}
          autoComplete="off"
          form={form}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your name!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.name}
              onChange={handleOnChangeDetail}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: "Please input your phone!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.phone}
              onChange={handleOnChangeDetail}
              name="phone"
            />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[
              {
                required: true,
                message: "Please input your address!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.address}
              onChange={handleOnChangeDetail}
              name="address"
            />
          </Form.Item>

          <Form.Item
            label="City"
            name="city"
            rules={[
              {
                required: true,
                message: "Please input your city!",
              },
            ]}
          >
            <InputComponent
              value={stateUserDetail.city}
              onChange={handleOnChangeDetail}
              name="city"
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>
    </div>
  );
};

export default OrderPage;
