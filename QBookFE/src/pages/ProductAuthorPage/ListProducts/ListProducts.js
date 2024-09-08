import React from "react";
import { WrapperProducts } from "./styles";
import CardProduct from "../../../components/CardProduct/CardProduct";

function ListProducts(props) {
  const { products, searchDebound } = props;
  return (
    <WrapperProducts>
      {products
        ?.filter((product) =>
          product.name.toLowerCase().includes(searchDebound.toLowerCase())
        )
        .map((product, index) => (
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
  );
}

export default ListProducts;
