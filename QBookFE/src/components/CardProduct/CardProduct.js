import { StarFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { convertPrice } from "../../utils/utils";
import { WrapperCardStyle } from "./styles";

const CardProduct = (props) => {
  const { name, image, price, rating, discount, selled, id, productRef } =
    props;

  const navigate = useNavigate();

  const handleProductDetail = () => {
    navigate(`/product-detail/${id}`);
  };

  return (
    <WrapperCardStyle
      ref={productRef}
      hoverable
      headStyle={{ width: "200px", height: "200px" }}
      style={{
        width: 200,
      }}
      bodyStyle={{ padding: "10px" }}
      cover={<img alt="example" src={image} className="object-cover" />}
      onClick={handleProductDetail}
      // onClick={() => countInStock !== 0 && handleProductDetail(id)}
      // disabled={countInStock === 0}
    >
      <img
        src={logo}
        alt="logo"
        style={{
          width: "68px",
          height: "14px",
          position: "absolute",
          top: "-1px",
          left: "-1px",
          borderTopLeftRadius: "8px",
        }}
      />
      <div className="absolute top-0 right-0 w-10 h-10 rounded-[50%] bg-[#d51c24] text-white text-base leading-10">
        {`-${discount}%`}
      </div>
      <div className="text-base whitespace-nowrap overflow-hidden text-ellipsis">
        {name}
      </div>
      <div className="flex items-center">
        <div className="mr-[5px] flex items-center gap-1">
          <div>{rating || 0}</div>
          <StarFilled className="text-[#ffc400]" />
        </div>
        <div> | Đã bán {selled || 0}</div>
      </div>
      <div className="flex items-center justify-between text-[#ff424e] text-base font-semibold">
        <div>{`${convertPrice(price - price * (discount / 100))}₫`}</div>
        <s className="text-gray-500">{`${convertPrice(price)}₫`}</s>
      </div>
    </WrapperCardStyle>
  );
};

export default CardProduct;
