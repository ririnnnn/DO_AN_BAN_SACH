import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Image, InputNumber, Rate, Row } from "antd";
import { useEffect, useState } from "react";
import { Comments, FacebookProvider } from "react-facebook";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import { addProductToCart, resetOrder } from "../../redux/slides/orderSlice";
import * as AuthorService from "../../services/AuthorService";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import { convertPrice, initFacebookSDK } from "../../utils/utils";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import LikeButtonComponent from "../LikeButtonComponent/LikeButtonComponent";
import ListProducts from "../../pages/HomePage/ListProducts/ListProducts";

const ProductDetailComponent = ({ id }) => {
  const [numberProduct, setNumberProduct] = useState(1);
  const [arrPublisher, setArrPublisher] = useState([]);
  const [arrAuthor, setArrAuthor] = useState([]);
  const [ratingValue, setRatingValue] = useState(1);
  const [product, setProduct] = useState([]);
  const [catProduct, setCatProduct] = useState([]);
  const [isLoadingCatProduct, setIsLoadingCatProduct] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  useEffect(() => {
    if (order?.isSuccessOrder) {
      Message.success("Thêm vào giỏ hàng thành công!");
    }
    return () => {
      dispatch(resetOrder());
    };
  }, [order?.isSuccessOrder]);

  const onChangeQuantityProduct = (value) => {};

  const handleChangeNumberProduct = (type, check) => {
    if (type === "increase") {
      if (!check) {
        setNumberProduct((prev) => prev + 1);
      } else {
        alert("Số lượng sản phẩm trong kho đã hết!");
      }
    } else {
      if (numberProduct > 1) {
        setNumberProduct((prev) => prev - 1);
      } else {
        setNumberProduct(1);
      }
    }
  };

  const orderRedux = order?.orderItems?.find(
    (item) => item.product === product?._id
  );

  const handleAddProductToCart = () => {
    if (user?.id === "") {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (
        orderRedux?.amount + numberProduct <= orderRedux?.countInStock ||
        !orderRedux
      ) {
        dispatch(
          addProductToCart({
            name: product?.name,
            image: product?.image,
            amount: numberProduct,
            price: product?.price,
            discount: product?.discount,
            product: product?._id,
            countInStock: product?.countInStock,
          })
        );
      } else {
        Message.error("Số lượng sản phẩm trong kho đã hết!");
      }
    }
  };

  const handleBuyProduct = () => {
    if (user?.id === "") {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (
        orderRedux?.amount + numberProduct <= orderRedux?.countInStock ||
        !orderRedux
      ) {
        dispatch(
          addProductToCart({
            name: product?.name,
            amount: numberProduct,
            image: product?.image,
            price: product?.price,
            discount: product?.discount,
            product: product?._id,
            countInStock: product?.countInStock,
          })
        );
        navigate("/order");
      } else {
        Message.error("Số lượng sản phẩm trong kho đã hết!");
      }
    }
  };

  const mutationRating = useMutationHook(({ productId, userId, rating }) => {
    const res = ProductService.ratingProduct(
      productId,
      userId,
      rating,
      user.access_token
    );
    return res;
  });

  const {
    data: dataRating,
    isSuccess: isSuccessRating,
    isError: isErrorRating,
  } = mutationRating;

  useEffect(() => {
    if (dataRating?.status === "OK" && isSuccessRating) {
      Message.success("Đánh giá sản phẩm thành công!");
    } else if (dataRating?.status === "ERROR" && isSuccessRating) {
      Message.error(dataRating?.message);
    } else if (isErrorRating) {
      Message.error("Đánh giá sản phẩm thất bại");
    }
  }, [isSuccessRating]);

  useEffect(() => {
    const fetchGetAllAuthor = async () => {
      const res = await AuthorService.getAllAuthor();
      setArrAuthor(res.data);
    };
    const fetchGetAllPublisher = async () => {
      const res = await PublisherService.getAllPublisher();
      setArrPublisher(res.data);
    };

    fetchGetAllPublisher();
    fetchGetAllAuthor();
    initFacebookSDK();
  }, []);

  useEffect(() => {
    async function getCatProduct(product) {
      if (!product.genreId) return;
      setIsLoadingCatProduct(true);
      console.log(product);
      const catProduct = await ProductService.getAllProductType(
        product.genreId,
        20
      );
      setCatProduct(catProduct?.data);
      setIsLoadingCatProduct(false);
    }
    const fetchProductDetail = async () => {
      const res = await ProductService.getDetailProduct(id);
      setProduct(res.data);
      getCatProduct(res.data);
    };

    fetchProductDetail();
  }, [isSuccessRating]);

  const findUserRating = product?.ratings?.find(
    (item) => item.userId.toString() === user.id
  );

  useEffect(() => {
    setRatingValue(findUserRating?.rating);
  }, [findUserRating]);

  const publisherBook = arrPublisher.find(
    (item) => item._id === product?.publisherId
  );

  const authorBook = arrAuthor.find((item) => item._id === product?.authorId);

  const handleOnChangeRating = (value) => {
    setRatingValue(value);
  };

  const handleRatingProduct = () => {
    if (user?.id === "") {
      navigate("/sign-in", { state: location?.pathname });
    } else {
      if (
        window.confirm(
          `Bạn có chắc chắn muốn đánh giá sản phẩm này ${ratingValue} sao không?`
        ) === true
      ) {
        mutationRating.mutate({
          productId: id,
          userId: user?.id,
          rating: ratingValue,
        });
      }
    }
  };

  return (
    <Row className="px-3 pt-5 pb-3 bg-white">
      <Col span={10}>
        <div className="flex gap-3">
          <Col span={4} className="flex-none">
            <Image
              className="w-[70px] h-[88px]"
              src={product?.image}
              alt="image product small"
              preview={true}
            />
          </Col>
          <Image
            src={product?.image}
            alt="image product"
            style={{ width: "526px", height: "600px", objectFit: "cover" }}
            preview={false}
          />
        </div>
      </Col>
      <Col
        span={14}
        className="flex flex-col gap-3 pt-0 px-4 pb-[100px] text-lg"
      >
        <h1 className="text-xl font-semibold">{product?.name}</h1>
        <div className="flex items-center gap-2">
          <Rate
            allowHalf
            defaultValue={product?.averageRating}
            value={product?.averageRating}
            disabled
            className="text-sm"
          />
          <div>
            {" "}
            (Số lượng đánh giá: {product?.ratings?.length || 0}) | (Đã bán{" "}
            {`${product?.selled || 0}+`})
          </div>
        </div>
        <div className="text-[#d51c24]">
          <span className="font-semibold">
            {convertPrice(
              product?.price - product?.price * (product?.discount / 100)
            )}{" "}
          </span>
          <sup>₫</sup> &nbsp;
          <s className="text-[#cccccc]">
            {convertPrice(product?.price)} <sup>₫</sup>
          </s>{" "}
          &nbsp;
          <span className="font-semibold">
            (Bạn đã tiết kiệm được {product?.discount}%)
          </span>
        </div>
        <div>
          <span>Tác giả: </span>
          {authorBook?.name ? (
            <span
              className="author text-red-500 font-semibold hover:opacity-85 cursor-pointer"
              onClick={() => navigate(`/product-author/${authorBook?._id}`)}
            >
              {authorBook?.name}
            </span>
          ) : (
            <span>Đang cập nhật</span>
          )}
        </div>
        <div>
          <span>Số trang: {product?.pageCount}</span>
        </div>
        <div>
          <span>Định dạng: {product?.format}</span>
        </div>
        <div>
          <span>Trọng lượng: {product?.weight}</span>
        </div>
        <div>
          <span>Nhà xuất bản: {publisherBook?.name}</span>
        </div>
        <div>
          <span>Giao đến: </span>
          <span className="address">
            {user?.address && user?.city
              ? `${user?.address}, ${user.city}`
              : "Vui lòng đăng nhập"}
          </span>{" "}
          {user?.id ? (
            <span
              className="change-address"
              onClick={() => navigate("/user-detail")}
            >
              {" "}
              <span className="text-[#d51c24] font-semibold">Đổi địa chỉ</span>
            </span>
          ) : null}
        </div>
        <LikeButtonComponent
          dataHref={
            process.env.REACT_APP_CHECK_LOCAL
              ? "https://developers.facebook.com/docs/plugins/"
              : window.location.href
          }
          className="mt-1"
        />
        {product?.countInStock !== 0 ? (
          <div>
            <div>
              <div>Số Lượng còn: {product.countInStock}</div>
              <div className="mt-3">
                <Button
                  onClick={() => handleChangeNumberProduct("decrease")}
                  icon={<MinusOutlined />}
                />
                <InputNumber
                  defaultValue={numberProduct}
                  onChange={(e) => {
                    if (e != null) setNumberProduct(e);
                  }}
                  value={numberProduct}
                  min={1}
                  max={product?.countInStock}
                  className="w-20 mx-1 my-0"
                />
                <Button
                  onClick={() =>
                    handleChangeNumberProduct(
                      "increase",
                      numberProduct === product?.countInStock
                    )
                  }
                  icon={<PlusOutlined />}
                />
              </div>
            </div>
            <div className="mt-5 flex gap-5">
              <ButtonComponent
                buttonText="Thêm vào giỏ"
                styleButton={{
                  backgroundColor: "rgb(255, 66, 78)",
                  width: "220px",
                  height: "48px",
                  border: "none",
                }}
                styleTextButton={{
                  color: "#fff",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
                onClick={handleAddProductToCart}
              />
              <ButtonComponent
                onClick={handleBuyProduct}
                buttonText="Mua ngay"
                styleButton={{
                  backgroundColor: "#fff",
                  width: "220px",
                  height: "48px",
                  border: "1px solid rgb(13, 92, 182)",
                }}
                styleTextButton={{
                  color: "rgb(13, 92, 182)",
                  fontSize: "15px",
                  fontWeight: "700",
                }}
              />
            </div>
          </div>
        ) : (
          <div style={{ marginTop: "20px" }}>
            <ButtonComponent
              buttonText="Tạm hết hàng"
              styleButton={{
                backgroundColor: "rgb(255, 66, 78)",
                width: "220px",
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
        )}
      </Col>
      <div className="mt-5 text-lg">
        <h1 className="text-xl font-semibold">Mô tả sản phẩm</h1>
        <div className="mt-3">
          {product?.description ? product?.description : "Đang cập nhật..."}
        </div>
      </div>
      <div className="w-full mt-5">
        <h1 className="text-xl font-semibold">Đánh giá sản phẩm</h1>
        <div className="flex items-center gap-3 mt-3">
          <Rate
            onChange={handleOnChangeRating}
            defaultValue={ratingValue}
            value={ratingValue}
            className="text-base"
          />
          <ButtonComponent
            buttonText="Gửi đánh giá"
            onClick={handleRatingProduct}
          />
        </div>
      </div>
      <div className="w-full mt-5 px-5">
        <ListProducts
          products={catProduct}
          title="SẢN PHẨM CÙNG THỂ LOẠI"
          isLoading={isLoadingCatProduct}
        ></ListProducts>
      </div>
      {/* <div className="w-full mt-5">
        <h1 className="text-xl font-semibold">Viết bình luận</h1>
        <div className="w-[1270px]">
          <FacebookProvider appId="1473682613178203">
            <Comments href={`www.facebook.com/post/${id}`} />
          </FacebookProvider>
        </div>
      </div> */}
    </Row>
  );
};

export default ProductDetailComponent;
