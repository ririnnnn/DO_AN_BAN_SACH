import {
  AccountBookOutlined,
  AppstoreOutlined,
  FormOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  PhoneOutlined,
  TeamOutlined,
  ReadOutlined,
  AreaChartOutlined,
  BoxPlotOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import AdminGenre from "../../components/AdminGenre/AdminGenre";
import AdminHome from "../../components/AdminHome/AdminHome";
import AdminOrder from "../../components/AdminOrder/AdminOrder";
import AdminProduct from "../../components/AdminProduct/AdminProduct";
import AdminPublisher from "../../components/AdminPublisher/AdminPublisher";
import AdminUser from "../../components/AdminUser/AdminUser";
import HeaderComponent from "../../components/HeaderComponent/HeaderComponent";
import { getItem } from "../../utils/utils";
import { WrapperContent } from "./styles";
import AdminContact from "../../components/AdminContact/AdminContact";
import AdminAuthor from "../../components/AdminAuthor/AdminAuthor";
import AdminNews from "../../components/AdminNews/AdminNews";
import AdminBanner from "../../components/AdminBanner/AdminBanner";

const AdminPage = () => {
  const renderKey = (key) => {
    switch (key) {
      case "home":
        return <AdminHome />;
      case "user":
        return <AdminUser />;
      case "product":
        return <AdminProduct />;
      case "order":
        return <AdminOrder />;
      case "author":
        return <AdminAuthor />;
      case "publisher":
        return <AdminPublisher />;
      case "genre":
        return <AdminGenre />;
      case "news":
        return <AdminNews />;
      case "contact":
        return <AdminContact />;
      case "banner":
        return <AdminBanner />;
      default:
        return <></>;
    }
  };
  const items = [
    getItem("Thống kê", "home", <AreaChartOutlined />),
    getItem("Người dùng", "user", <UserOutlined />),
    getItem("Sản phẩm", "product", <AppstoreOutlined />),
    getItem("Đơn hàng", "order", <ShoppingCartOutlined />),
    getItem("Tác giả", "author", <TeamOutlined />),
    getItem("Nhà xuất bản", "publisher", <FormOutlined />),
    getItem("Thể loại", "genre", <AccountBookOutlined />),
    getItem("Tin tức", "news", <ReadOutlined />),
    getItem("Liên hệ", "contact", <PhoneOutlined />),
    getItem("Banner", "banner", <BoxPlotOutlined />),
  ];
  const [keySelected, setKeySelected] = useState("home");

  const handleClick = ({ item, key }) => {
    setKeySelected(key);
  };

  return (
    <>
      <HeaderComponent isHiddenSearch isHiddenCart />
      <div style={{ display: "flex", height: "100%" }}>
        <Menu
          mode="inline"
          theme="dark"
          onClick={handleClick}
          style={{
            backgroundColor: "#34495e",
            minWidth: 256,
            maxWidth: 256,
            minHeight: "calc(100vh - 90px)",
            borderRight: "2px solid #ccc",
          }}
          items={items}
        />
        <WrapperContent style={{ padding: "10px 15px 15px", flex: 1 }}>
          {renderKey(keySelected)}
        </WrapperContent>
      </div>
    </>
  );
};

export default AdminPage;
