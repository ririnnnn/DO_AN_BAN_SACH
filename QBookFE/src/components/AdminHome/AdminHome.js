import {
  AppstoreOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Card, Col, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as OrderService from "../../services/OrderService";
import * as ProductService from "../../services/ProductService";
import * as UserService from "../../services/UserService";
import { convertPrice } from "../../utils/utils";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ContentOfTooltip from "./ContentOfTooltip";
import { WrapperSelect } from "./styles";

const AdminHome = () => {
  const user = useSelector((state) => state.user);
  // const [countOrder, setCountOrder] = useState(0);
  // const [countUser, setCountUser] = useState(0);
  // const [countProduct, setCountProduct] = useState(0);
  // const [orderAll, setOrderAll] = useState(null);
  // const [totalPrice, setTotalPrice] = useState(0);
  // const [isLoadingOrder, setIsLoadingOrder] = useState(false);
  // const [year, setYear] = useState("2024");

  // const getCountUser = async () => {
  //   const res = await UserService.getCountUser(user?.access_token);
  //   setCountUser(res?.data);
  // };

  // const getCountProduct = async () => {
  //   const res = await ProductService.getCountProduct(user?.access_token);
  //   setCountProduct(res?.data);
  // };

  // const getCountOrder = async () => {
  //   const res = await OrderService.getCountOrder(user?.access_token);
  //   setCountOrder(res?.data);
  // };

  // const getOrderAll = async () => {
  //   setIsLoadingOrder(true);
  //   const res = await OrderService.getAllOrder(user?.access_token);
  //   setOrderAll(res?.data);
  //   setIsLoadingOrder(false);
  // };

  // const getTotalPrice = async () => {
  //   const res = await OrderService.getTotalPrice(user?.access_token);
  //   setTotalPrice(res?.data);
  // };

  // useEffect(() => {
  //   getCountUser();
  //   getCountProduct();
  //   getCountOrder();
  //   getOrderAll();
  //   getTotalPrice();
  // }, []);

  // const handleOnChangeSelect = (value) => {
  //   setYear(value);
  // };

  return (
    <div style={{ width: "100%", height: "100%" }}>
      {/* <div>
        <Row gutter={16}>
          <Col span={6}>
            <Card
              title="Số lượng người dùng"
              bordered={true}
              headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              style={{
                border: "2px solid #00B300",
                backgroundColor: "#B3FFCC",
              }}
            >
              <span>
                <UserOutlined /> {countUser}
              </span>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Số lượng sản phẩm"
              bordered={true}
              headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              style={{
                border: "2px solid #E6E600",
                backgroundColor: "#FFFFCC",
              }}
            >
              <span>
                <AppstoreOutlined /> {countProduct}
              </span>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Số lượng đơn hàng"
              bordered={true}
              headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              style={{
                border: "2px solid #00E6E6",
                backgroundColor: "#B3FFFF",
              }}
            >
              <span>
                <ShoppingCartOutlined /> {countOrder}
              </span>
            </Card>
          </Col>
          <Col span={6}>
            <Card
              title="Tổng doanh thu"
              bordered={true}
              headStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              bodyStyle={{ textAlign: "center", fontSize: "1.8rem" }}
              style={{
                border: "2px solid #FF884D",
                backgroundColor: "#FFCCB3",
              }}
            >
              <span>
                <DollarOutlined /> {`${convertPrice(totalPrice) || 0} VND`}
              </span>
            </Card>
          </Col>
        </Row>
      </div>
      <WrapperSelect>
        <Select
          defaultValue={year}
          style={{
            width: 120,
          }}
          onChange={handleOnChangeSelect}
          options={[
            {
              value: "2024",
              label: "2024",
            },
            {
              value: "2023",
              label: "2023",
            },
          ]}
        />
      </WrapperSelect>
      <LoadingComponent isLoading={isLoadingOrder}>
        <div style={{ width: "100%", height: "500px", marginTop: "30px" }}>
          <ContentOfTooltip dataOrder={orderAll} dataYear={year}/>
        </div>
      </LoadingComponent> */}
    </div>
  );
};

export default AdminHome;
