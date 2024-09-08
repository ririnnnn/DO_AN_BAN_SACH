import { useNavigate } from "react-router-dom";

const TypeProduct = ({ type, genre }) => {
  const navigate = useNavigate();

  const handleTypeProduct = () => {
    navigate(
      `/product/${type
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        ?.replace(/ /g, "_")}`,
      { state: genre }
    );
  };
  return (
    <div onClick={handleTypeProduct}>{type}</div>
  );
};

export default TypeProduct;
