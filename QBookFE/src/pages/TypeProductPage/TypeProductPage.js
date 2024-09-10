import { CloseCircleFilled } from "@ant-design/icons";
import { Checkbox, Col, Pagination, Rate, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import CardProduct from "../../components/CardProduct/CardProduct";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as GenreService from "../../services/GenreService";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";

import { Dropdown, Space } from "antd";
import TypeProduct from "../../components/TypeProduct/TypeProduct";

import {
  WrapperContent,
  WrapperFilter,
  WrapperItemCategory,
  WrapperItemFilter,
  WrapperNavbar,
  WrapperNavigation,
  WrapperNavigationHome,
  WrapperPagination,
  WrapperPriceText,
  WrapperProducts,
  WrapperTitleText,
  WrapperTypeProduct,
} from "./styles";

const TypeProductPage = () => {
  const { state: genre } = useLocation();
  const navigate = useNavigate();

  const [productGenre, setProductGenre] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(1);
  const [pageValue, setPageValue] = useState(1);
  const [ratingValue, setRatingValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [genreProduct, setGenreProduct] = useState([]);
  const [publisher, setPublisher] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);

  const onChangeCheckbox = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (e.target.checked) {
      setSelectedFilter((prevFilter) => [
        ...prevFilter,
        { value: value, name: name },
      ]);
      setSelectedValues((prevValues) => [...prevValues, value]);
    } else {
      setSelectedFilter((prevFilter) =>
        prevFilter.filter((item) => item.value !== value)
      );
      setSelectedValues((prevValues) =>
        prevValues.filter((item) => item !== value)
      );
    }
  };

  const fetchNewAllProductGenre = async (
    genre,
    limit,
    page,
    publisher,
    typeSort,
    ratingValue
  ) => {
    setIsLoading(true);
    const res = await ProductService.getAllProductType(
      genre,
      limit,
      page,
      publisher,
      typeSort,
      ratingValue
    );
    setProductGenre(res?.data);
    setTotalProduct(res?.totalProduct);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchNewAllProductGenre(
      genre,
      10,
      pageValue,
      selectedValues,
      sortValue,
      ratingValue
    );
  }, [genre, pageValue, ratingValue, sortValue, selectedValues]);

  const onChange = (page) => {
    setPageValue(page);
  };
  const items = genreProduct.map((item, index) => ({
    key: `${index}`,
    label: <TypeProduct type={item?.name} genre={item?._id} />,
  }));

  useEffect(() => {
    fetchAllGenreProduct();
  }, []);
  const renderContent = (type, option) => {
    switch (type) {
      case "text":
        return option.map((item, index) => {
          return (
            <WrapperItemCategory
              key={index}
              style={{
                cursor: "pointer",
                background: genre == item?._id ? "#189eff" : "",
                color: genre == item?._id ? "white" : "",
              }}
              className="rounded"
              onClick={() => {
                handleDeleteAllFilter();
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
      case "checkbox":
        return option.map((item, index) => {
          return (
            <Checkbox
              onChange={onChangeCheckbox}
              key={index}
              name={item.text}
              value={item.value}
              checked={selectedValues.includes(item.value)}
            >
              <span style={{ fontFamily: "Time New Roman", fontSize: "14px" }}>
                {item.text}
              </span>
            </Checkbox>
          );
        });
      case "price":
        return option.map((item, index) => {
          return (
            <WrapperPriceText key={index} style={{ cursor: "pointer" }}>
              {item}
            </WrapperPriceText>
          );
        });
      case "rating":
        return option.map((item, index) => {
          return (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              key={index}
              onClick={() => {
                if (item === 3) {
                  setRatingValue("3");
                  setSelectedFilter((prevFilter) => {
                    const checkRating3 = prevFilter.some(
                      (prev) => prev.value === 3
                    );
                    const checkRating4 = prevFilter.some(
                      (prev) => prev.value === 4
                    );
                    const checkRating5 = prevFilter.some(
                      (prev) => prev.value === 5
                    );
                    if (checkRating3) {
                      return [...prevFilter];
                    }
                    if (checkRating4) {
                      return [
                        ...prevFilter.filter((prev) => prev.value !== 4),
                        { value: 3, name: `Từ 3 sao` },
                      ];
                    }
                    if (checkRating5) {
                      return [
                        ...prevFilter.filter((prev) => prev.value !== 5),
                        { value: 3, name: `Từ 3 sao` },
                      ];
                    }
                    return [...prevFilter, { value: 3, name: `Từ 3 sao` }];
                  });
                }

                if (item === 4) {
                  setRatingValue("4");
                  setSelectedFilter((prevFilter) => {
                    const checkRating3 = prevFilter.some(
                      (prev) => prev.value === 3
                    );
                    const checkRating4 = prevFilter.some(
                      (prev) => prev.value === 4
                    );
                    const checkRating5 = prevFilter.some(
                      (prev) => prev.value === 5
                    );
                    if (checkRating3) {
                      return [
                        ...prevFilter.filter((prev) => prev.value !== 3),
                        { value: 4, name: `Từ 4 sao` },
                      ];
                    }
                    if (checkRating4) {
                      return [...prevFilter];
                    }
                    if (checkRating5) {
                      return [
                        ...prevFilter.filter((prev) => prev.value !== 5),
                        { value: 4, name: `Từ 4 sao` },
                      ];
                    }
                    return [...prevFilter, { value: 4, name: `Từ 4 sao` }];
                  });
                }

                if (item === 5) {
                  setRatingValue("5");
                  setSelectedFilter((prevFilter) => {
                    const checkRating3 = prevFilter.some(
                      (prev) => prev.value === 3
                    );
                    const checkRating4 = prevFilter.some(
                      (prev) => prev.value === 4
                    );
                    const checkRating5 = prevFilter.some(
                      (prev) => prev.value === 5
                    );
                    if (checkRating3) {
                      return [
                        ...prevFilter.filter((prev) => prev.value !== 3),
                        { value: 5, name: `Từ 5 sao` },
                      ];
                    }
                    if (checkRating4) {
                      return [
                        ...prevFilter.filter((prev) => prev.value !== 4),
                        { value: 5, name: `Từ 5 sao` },
                      ];
                    }
                    if (checkRating5) {
                      return [...prevFilter];
                    }
                    return [...prevFilter, { value: 5, name: `Từ 5 sao` }];
                  });
                }
              }}
            >
              <Rate
                style={{ fontSize: "12px", cursor: "pointer" }}
                disabled
                value={item}
              />{" "}
              &nbsp;
              <span
                style={{
                  fontSize: "14px",
                  color: "#242424",
                  paddingLeft: "4px",
                  position: "relative",
                  top: "2px",
                }}
              >
                {" "}
                từ {item} sao
              </span>
            </div>
          );
        });
      default:
        return {};
    }
  };

  const fetchAllGenreProduct = async () => {
    const res = await GenreService.getAllGenre();
    setGenreProduct(res?.data);
  };

  const fetchAllPublisher = async () => {
    const res = await PublisherService.getAllPublisher();
    setPublisher(res?.data);
  };

  useEffect(() => {
    fetchAllGenreProduct();
    fetchAllPublisher();
  }, []);

  const dataCheckBoxPublisher = publisher?.map((item, index) => {
    return {
      value: item._id,
      text: item.name,
    };
  });

  const handleChange = (value) => {
    setSortValue(value);
  };

  const handleDeleteAllFilter = () => {
    setSelectedFilter([]);
    setSelectedValues([]);
    setRatingValue("");
    setSortValue("");
  };

  return (
    <>
      <div className="flex justify-center">
        <div className="w-[1285px] flex items-center gap-[10px] overflow-x-auto whitespace-nowrap">
          <Dropdown
            menu={{
              items,
            }}
            className="text-base p-3 cursor-pointer hover:bg-[#189eff] hover:text-white transition"
          >
            <Space>Danh Mục Sản Phẩm</Space>
          </Dropdown>
          <div
            className="text-base p-3 cursor-pointer hover:bg-[#189eff] hover:text-white transition"
            onClick={() => navigate("/intro")}
          >
            Giới thiệu
          </div>
          <div
            className="text-base p-3 cursor-pointer hover:bg-[#189eff] hover:text-white transition"
            onClick={() => navigate("/news")}
          >
            Tin tức
          </div>
          <div
            className="text-base p-3 cursor-pointer hover:bg-[#189eff] hover:text-white transition"
            onClick={() => navigate("/contact")}
          >
            Liên hệ
          </div>
        </div>
      </div>
      <WrapperTypeProduct>
        <div
          style={{
            width: "1285px",
            minHeight: "calc(100vh - 90px)",
            margin: "0 auto",
            padding: "12px 0px",
          }}
        >
          {/* <WrapperNavigation>
            <span>Xem sản phẩm theo danh mục</span>
          </WrapperNavigation> */}
          <Row
            style={{
              flexWrap: "nowrap",
              paddingBottom: "20px",
              height: "100%",
            }}
          >
            <Col span={4}>
              <WrapperNavbar className="rounded-lg border border-stone-400">
                <WrapperTitleText>Danh mục sách</WrapperTitleText>
                <WrapperContent>
                  {renderContent("text", genreProduct)}
                </WrapperContent>
                <WrapperTitleText>Nhà xuất bản</WrapperTitleText>
                <WrapperContent>
                  {renderContent("checkbox", dataCheckBoxPublisher)}
                </WrapperContent>
                <WrapperTitleText>Đánh giá</WrapperTitleText>
                <WrapperContent>
                  {renderContent("rating", [5, 4, 3])}
                </WrapperContent>
              </WrapperNavbar>
            </Col>
            <Col span={20}>
              <LoadingComponent isLoading={isLoading}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                  }}
                >
                  <ButtonComponent
                    onClick={() => handleDeleteAllFilter()}
                    buttonText="Xóa bộ lọc"
                  >
                    Xóa tất cả
                  </ButtonComponent>
                  <WrapperPagination>
                    <Pagination
                      defaultCurrent={pageValue}
                      total={totalProduct}
                      pageSize={10}
                      onChange={onChange}
                      style={{ textAlign: "center", marginTop: "20px" }}
                    />
                    <Select
                      defaultValue="asc"
                      style={{
                        width: 160,
                      }}
                      onChange={handleChange}
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
                  {!!selectedFilter.length &&
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
                    ))}
                </WrapperFilter>
                <WrapperProducts>
                  {productGenre.map((product, index) => (
                    <CardProduct
                      key={product._id}
                      name={product.name}
                      price={product.price}
                      image={product.image}
                      rating={product.averageRating}
                      description={product.description}
                      countInStock={product.countInStock}
                      type={product.type}
                      discount={product.discount}
                      selled={product.selled}
                      id={product._id}
                    />
                  ))}
                </WrapperProducts>
              </LoadingComponent>
            </Col>
          </Row>
        </div>
      </WrapperTypeProduct>
    </>
  );
};

export default TypeProductPage;
