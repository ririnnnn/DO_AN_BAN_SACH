import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useEffect, useRef, useState } from "react";
import CardProduct from "../../../components/CardProduct/CardProduct";
import LoadingComponent from "../../../components/LoadingComponent/LoadingComponent";
import { SmoothHorizontalScrolling } from "../../../utils/utils";

function ListProducts(props) {
  const { products, title, isLoading } = props;
  const [dragDown, setDragDown] = useState(0);
  const [dragMove, setDragMove] = useState(0);
  const [isDrag, setIsDrag] = useState(false);

  const productRef = useRef();
  const slitherRef = useRef();

  useEffect(() => {
    if (isDrag) {
      if (dragDown > dragMove) handleScrollRight();
      if (dragDown < dragMove) handleScrollLeft();
    }
  }, [dragDown, dragMove, isDrag]);

  const onDragStart = (e) => {
    setIsDrag(true);
    setDragDown(e.screenX);
  };

  const onDragEnd = (e) => {
    setIsDrag(false);
  };

  const onDragEnter = (e) => {
    setDragMove(e.screenX);
  };

  const handleScrollLeft = () => {
    if (slitherRef.current.scrollLeft > 0) {
      SmoothHorizontalScrolling(
        slitherRef.current,
        250,
        -productRef.current.clientWidth * 2,
        slitherRef.current.scrollLeft
      );
    }
  };

  const handleScrollRight = () => {
    const maxScrollWidth =
      slitherRef.current.scrollWidth - slitherRef.current.clientWidth;
    if (slitherRef.current.scrollLeft < maxScrollWidth) {
      // slitherRef.current là thẻ HTML hiện tại
      // 250 là thời gian
      // productRef.current.clientWidth là chiều ngang của các product
      // slitherRef.current.scrollLeft là vị trí ban đầu bằng 0
      SmoothHorizontalScrolling(
        slitherRef.current,
        250,
        productRef.current.clientWidth * 2,
        slitherRef.current.scrollLeft
      );
    }
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <h2 className="mt-5 text-center text-lg font-semibold">{title}</h2>
      <div style={{ position: "relative" }}>
        <div
          ref={slitherRef}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragEnter={onDragEnter}
          draggable="true"
          style={
            products && products.length > 0
              ? {
                  gridTemplateColumns: `repeat(${products.length}, 200px)`,
                }
              : null
          }
          className="px-0 py-5 grid gap-[17px] overflow-hidden transition scroll-smooth"
        >
          {products.map((product, index) => (
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
              productRef={productRef}
            />
          ))}
        </div>
        <div
          className="w-10 h-10 rounded-[50%] absolute top-[50%] left-[-20px] translate-y-[-30px] bg-[#189eff] text-white text-center leading-[34px] cursor-pointer hover:bg-[#74b9ff] hover:transition"
          onClick={handleScrollLeft}
        >
          <LeftOutlined />
        </div>
        <div
          className="w-10 h-10 rounded-[50%] absolute top-[50%] right-[-20px] translate-y-[-30px] bg-[#189eff] text-white text-center leading-[34px] cursor-pointer hover:bg-[#74b9ff] hover:transition"
          onClick={handleScrollRight}
        >
          <RightOutlined />
        </div>
      </div>
    </LoadingComponent>
  );
}

export default ListProducts;
