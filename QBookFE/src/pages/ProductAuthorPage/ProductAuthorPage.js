import { useQuery } from "@tanstack/react-query";
import { Checkbox, Col, Pagination, Rate, Row, Select } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import * as AuthorService from "../../services/AuthorService";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import ListProducts from "./ListProducts/ListProducts";
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
  WrapperProductAuthor,
  WrapperTitleText,
} from "./styles";
import { CloseCircleFilled } from "@ant-design/icons";

const ProductAuthorPage = () => {
  const { id: authorId } = useParams();
  const { search: valueSearch } = useSelector((state) => state.product);
  const searchDebound = useDebounceHook(valueSearch, 1000);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [productAuthor, setProductAuthor] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalProduct, setTotalProduct] = useState(1);
  const [pageProduct, setPageProduct] = useState({
    limit: 10,
    page: 0,
  });
  const [ratingValue, setRatingValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [publisher, setPublisher] = useState([]);
  const [selectedValues, setSelectedValues] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState([]);

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

  useEffect(() => {
    const fetchProductAuthor = async () => {
      setIsLoading(true);
      const res = await ProductService.getProductAuthor(
        authorId,
        pageProduct.limit,
        pageProduct.page,
        selectedValues,
        sortValue,
        ratingValue
      );
      if (res?.data) {
        setProductAuthor(res?.data);
        setTotalProduct(res?.data?.length);
      }
      setIsLoading(false);
    };

    fetchProductAuthor();
  }, [authorId, pageProduct, selectedFilter, selectedValues, sortValue]);

  const fetchGetAuthor = async () => {
    const res = await AuthorService.getDetailAuthor(authorId);
    return res.data;
  };

  const queryGetAuthor = useQuery(["author"], fetchGetAuthor);

  const { data: dataAuthor } = queryGetAuthor;

  const onChange = (page, pageSize) => {
    setPageProduct({
      ...pageProduct,
      page: page - 1,
    });
  };

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
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              key={index}
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

  useEffect(() => {
    const fetchAllPublisher = async () => {
      const res = await PublisherService.getAllPublisher();
      setPublisher(res?.data);
    };

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
    <WrapperProductAuthor>
      <div style={{ width: "1285px", margin: "0 auto" }}>
        <WrapperNavigation>
          <WrapperNavigationHome onClick={() => navigate("/")}>
            Trang chủ
          </WrapperNavigationHome>
          <span> -- Các sách của tác giả {dataAuthor?.name}</span>
        </WrapperNavigation>
        <Row
          style={{ flexWrap: "nowrap", paddingBottom: "20px", height: "100%" }}
        >
          <Col span={4}>
            <WrapperNavbar>
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

                {/* Phân trang */}
                <WrapperPagination>
                  <Pagination
                    defaultCurrent={1}
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

              <ListProducts
                products={productAuthor}
                searchDebound={searchDebound}
              />
            </LoadingComponent>
          </Col>
        </Row>
      </div>
    </WrapperProductAuthor>
  );
};

export default ProductAuthorPage;
