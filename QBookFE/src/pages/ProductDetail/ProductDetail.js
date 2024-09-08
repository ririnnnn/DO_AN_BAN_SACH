import { useNavigate, useParams } from "react-router-dom";
import ProductDetailComponent from "../../components/ProductDetailComponent/ProductDetailComponent";

const ProductDetail = () => {
  const navigate = useNavigate();

  const { id: idProduct } = useParams();

  return (
    <div className="w-full bg-[#efefef]">
      <div className="w-[1285px] mx-auto my-0">
        <div className="flex gap-1 py-4 text-lg">
          <div onClick={() => navigate("/")} className="font-semibold">
            Trang chủ
          </div>
          <span>/</span>
          <span>Chi tiết sản phẩm</span>
        </div>
        <ProductDetailComponent id={idProduct} />
      </div>
    </div>
  );
};

export default ProductDetail;
