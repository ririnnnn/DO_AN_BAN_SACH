import { Col, Pagination, Row, Select } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardProduct from "../../components/CardProduct/CardProduct";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as GenreService from "../../services/GenreService";
import * as ProductService from "../../services/ProductService";
import { sortDate } from "../../utils/sorts";
import {
  WrapperContent,
  WrapperFilter,
  WrapperItemCategory,
  WrapperNavbar,
  WrapperNavigation,
  WrapperNavigationHome,
  WrapperPagination,
  WrapperProducts,
  WrapperTitleText,
  WrapperTypeProduct,
} from "./styles";

function ProductSearchPage() {
  const location = useLocation();
  const searchLocation = location.search;
  const valueSearch = searchLocation.split("=")[1];
  const navigate = useNavigate();

  const [dataProduct, setDataProduct] = useState([]);
  const [genreProduct, setGenreProduct] = useState([]);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  useEffect(() => {
    const fetchAllGenreProduct = async () => {
      const res = await GenreService.getAllGenre();
      if (res?.status === "OK") {
        setGenreProduct(res?.data);
      }
    };

    fetchAllGenreProduct();
  }, []);

  const renderContent = (type, option) => {
    switch (type) {
      case "text":
        return option.map((item, index) => {
          return (
            <WrapperItemCategory
              key={index}
              style={{ cursor: "pointer" }}
              onClick={() => {
                navigate(
                  `/product/${item?.name
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    ?.replace(/ /g, "_")}`,
                  { state: item?._id }
                );
              }}
            >
              {item?.name}
            </WrapperItemCategory>
          );
        });
      default:
        return {};
    }
  };

  useEffect(() => {
    const searchProduct = async () => {
      setIsLoadingProduct(true);
      const res = await ProductService.getProductSearch(valueSearch);
      setDataProduct(res.data);
      setIsLoadingProduct(false);
    };
    searchProduct();
  }, [valueSearch]);

  return (
    <WrapperTypeProduct>
      <div style={{ width: "1285px", height: "100%", margin: "0 auto" }}>
        <WrapperNavigation>
          <WrapperNavigationHome onClick={() => navigate("/")}>
            Trang chủ
          </WrapperNavigationHome>
          <span> -- Tìm kiếm sách theo tên</span>
        </WrapperNavigation>
        <Row
          style={{ flexWrap: "nowrap", paddingBottom: "20px", height: "100vh" }}
        >
          <Col span={4}>
            <WrapperNavbar className="rounded-lg border border-stone-400">
              <WrapperTitleText>Danh mục sách</WrapperTitleText>
              <WrapperContent>
                {renderContent("text", genreProduct)}
              </WrapperContent>
            </WrapperNavbar>
          </Col>
          <Col span={20}>
            <LoadingComponent isLoading={isLoadingProduct}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: "10px",
                }}
              >
                <ButtonComponent onClick={() => {}} buttonText="Xóa bộ lọc">
                  Xóa tất cả
                </ButtonComponent>
                <WrapperPagination>
                  <Pagination
                    defaultCurrent={1}
                    total={10}
                    pageSize={10}
                    onChange={() => {}}
                    style={{ textAlign: "center", marginTop: "20px" }}
                  />
                  <Select
                    defaultValue="asc"
                    style={{
                      width: 160,
                    }}
                    onChange={() => {}}
                    options={[
                      {
                        value: "asc",
                        label: "Giá thấp đến cao",
                      },
                      {
                        value: "desc",
                        label: "Giá cao đến thấp",
                      },
                    ]}
                  />
                </WrapperPagination>
              </div>
              <WrapperFilter>
                {/* {!!selectedFilter.length &&
                  selectedFilter.map((item, index) => (
                    <WrapperItemFilter key={index}>
                      <div>{item.name}</div>
                      <div
                        style={{ cursor: "pointer" }}
                        // Logic xóa theo từng filter
                        onClick={() => {
                          // Giúp gọi lại API trong useEffect
                          setSelectedValues((prevValues) =>
                            prevValues.filter(
                              (itemValue) => itemValue !== item.value
                            )
                          );
                          // Giúp render lại các nhãn filter
                          setSelectedFilter((prevFilter) =>
                            prevFilter.filter(
                              (itemFilter) => itemFilter.value !== item.value
                            )
                          );
                          setRatingValue("");
                        }}
                      >
                        <CloseCircleFilled style={{ fontSize: "1.4rem" }} />
                      </div>
                    </WrapperItemFilter>
                  ))} */}
              </WrapperFilter>
              <WrapperProducts>
                {dataProduct.length === 0 ? (
                  <div>Sản phẩm không có...</div>
                ) : (
                  sortDate(dataProduct).map((product) => (
                    <CardProduct
                      key={product._id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      rating={product.rating}
                      description={product.description}
                      countInStock={product.countInStock}
                      type={product.type}
                      discount={product.discount}
                      selled={product.selled}
                      id={product._id}
                    />
                  ))
                )}
              </WrapperProducts>
            </LoadingComponent>
          </Col>
        </Row>
      </div>
    </WrapperTypeProduct>
  );
}

export default ProductSearchPage;
