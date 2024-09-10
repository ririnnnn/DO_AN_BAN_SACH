import { useQuery } from "@tanstack/react-query";
import { Dropdown, Space } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import slider1 from "../../assets/images/banner1.jpg";
import slider2 from "../../assets/images/banner2.jpg";
import slider3 from "../../assets/images/banner3.jpg";
import CardProduct from "../../components/CardProduct/CardProduct";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import SliderComponent from "../../components/SliderComponent/SliderComponent";
import TypeProduct from "../../components/TypeProduct/TypeProduct";
import { useDebounceHook } from "../../hooks/useDebounceHook";
import * as GenreService from "../../services/GenreService";
import * as ProductService from "../../services/ProductService";
import ListProducts from "./ListProducts/ListProducts";
import { WrapperButtonComponent, WrapperProducts } from "./styles";

const HomePage = () => {
  const [genreProduct, setGenreProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingBookBestSeller, setIsLoadingBookBestSeller] = useState(false);
  const [isLoadingBookVanHocVietNam, setIsLoadingBookVanHocVietNam] =
    useState(false);
  const [isLoadingBookTruyenTranh, setIsLoadingBookTruyenTranh] =
    useState(false);
  const [isLoadingBookMangaComic, setIsLoadingBookMangaComic] = useState(false);
  const [limitProduct, setLimitProduct] = useState(6);

  const valueSearchInput = useSelector((state) => state.product.search);
  const valueDebounce = useDebounceHook(valueSearchInput, 800);

  const [productBestSeller, setProductBestSeller] = useState([]);
  const [productVN, setProductVN] = useState([]);
  const [productTruyenTranh, setProductTruyenTranh] = useState([]);
  const [productMangaComic, setProductMangaComic] = useState([]);

  const navigate = useNavigate();

  const fetchProduct = async (context) => {
    const valueSearch = context?.queryKey ? context?.queryKey[2] : "";
    const limit = context?.queryKey ? context?.queryKey[1] : null;
    setIsLoading(true);
    const res = await ProductService.getAllProduct(limit, valueSearch);
    setIsLoading(false);
    return res;
  };

  const { data: products } = useQuery(
    ["products", limitProduct],
    fetchProduct,
    {
      retry: 3,
      retryDelay: 1000,
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const handleLoadMore = () => {
    setLimitProduct((prev) => prev + 6);
  };

  const fetchAllGenreProduct = async () => {
    const res = await GenreService.getAllGenre();
    setGenreProduct(res?.data);
  };

  const fetchBookBestSeller = async (page, limit) => {
    setIsLoadingBookBestSeller(true);
    const res = await ProductService.getBestSeller(page, limit);
    setProductBestSeller(res?.data);
    setIsLoadingBookBestSeller(false);
  };

  const fetchBookVanHocVietNam = async (genre, limit, page) => {
    setIsLoadingBookVanHocVietNam(true);
    const res = await ProductService.getAllProductType(genre, limit, page);
    setProductVN(res?.data);
    setIsLoadingBookVanHocVietNam(false);
  };

  const fetchBookTruyenTranh = async (genre, limit, page) => {
    setIsLoadingBookTruyenTranh(true);
    const res = await ProductService.getAllProductType(genre, limit, page);
    setProductTruyenTranh(res?.data);
    setIsLoadingBookTruyenTranh(false);
  };

  const fetchBookMangaComic = async (genre, limit, page) => {
    setIsLoadingBookMangaComic(true);
    const res = await ProductService.getAllProductType(genre, limit, page);
    setProductMangaComic(res?.data);
    setIsLoadingBookMangaComic(false);
  };

  useEffect(() => {
    fetchBookBestSeller(1, 12);
    fetchBookVanHocVietNam("6646bcdd97a1e099aa7b95da", 12);
    fetchBookTruyenTranh("664621477b7a9f1af95d7473", 12);
    fetchBookMangaComic("6646c46126ef6ab2ab486b0b", 12);
    fetchAllGenreProduct();
  }, []);

  const items = genreProduct.map((item, index) => ({
    key: `${index}`,
    label: <TypeProduct type={item?.name} genre={item?._id} />,
  }));

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

      <div
        style={{
          width: "100%",
          backgroundColor: "#f5f5fa",
          paddingBottom: "30px",
        }}
        className="body"
      >
        <div className="w-[1285px] mx-auto my-0">
          <SliderComponent arrImages={[slider1, slider2, slider3]} />

          <LoadingComponent isLoading={isLoading}>
            <div className="hidden lg:block">
              <h2 className="mt-5 text-center text-lg font-semibold">
                Sách mới
              </h2>
              <WrapperProducts>
                {products?.data
                  ?.filter((product) =>
                    product.name
                      .toLowerCase()
                      .includes(valueDebounce.toLowerCase())
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
              {/* <div className="text-center">
                <WrapperButtonComponent
                  buttonText={"Xem thêm"}
                  disabled={
                    products?.totalProduct === products?.data?.length ||
                    products?.totalPage === 1
                  }
                  onClick={handleLoadMore}
                />
              </div> */}
            </div>
          </LoadingComponent>

          <ListProducts
            products={productBestSeller}
            title="SÁCH BÁN CHẠY"
            isLoading={isLoadingBookBestSeller}
          />
          {/* <ListProducts
            products={productVN}
            title="SÁCH VĂN HỌC VIỆT NAM"
            isLoading={isLoadingBookVanHocVietNam}
          />
          <ListProducts
            products={productTruyenTranh}
            title="TRUYỆN TRANH"
            isLoading={isLoadingBookTruyenTranh}
          />
          <ListProducts
            products={productMangaComic}
            title="MANGA - COMIC"
            isLoading={isLoadingBookMangaComic}
          /> */}
        </div>
      </div>
    </>
  );
};

export default HomePage;
