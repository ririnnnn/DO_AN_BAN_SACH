import AdminPage from "../pages/AdminPage/AdminPage";
import ChangePasswordPage from "../pages/ChangePasswordPage/ChangePasswordPage";
import ContactPage from "../pages/ContactPage/ContactPage";
import HomePage from "../pages/HomePage/HomePage";
import IntroPage from "../pages/IntroPage/IntroPage";
import MyContactPage from "../pages/MyContactPage/MyContactPage";
import MyOrderPage from "../pages/MyOrderPage/MyOrderPage";
import NewDetailPage from "../pages/NewsDetailPage/NewDetailPage";
import NewsPage from "../pages/NewsPage/NewsPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderDetailPage from "../pages/OrderDetailPage/OrderDetailPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import OrderSuccessPage from "../pages/OrderSuccessPage/OrderSuccessPage";
import PaymentPage from "../pages/PaymentPage/PaymentPage";
import ProductAuthorPage from "../pages/ProductAuthorPage/ProductAuthorPage";
import ProductDetail from "../pages/ProductDetail/ProductDetail";
import ProductSearchPage from "../pages/ProductSearchPage/ProductSearchPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/ProfilePage/ProfilePage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";

export const routes = [
  {
    path: "/",
    page: HomePage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/order",
    page: OrderPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/order-success",
    page: OrderSuccessPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/order-detail/:id",
    page: OrderDetailPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/my-order",
    page: MyOrderPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/payment",
    page: PaymentPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/product-spage",
    page: ProductsPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/user-detail",
    page: ProfilePage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/product/:type",
    page: TypeProductPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/sign-in",
    page: SignInPage,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/sign-up",
    page: SignUpPage,
    isShowHeader: false,
    isShowFooter: false,
  },
  {
    path: "/product-detail/:id",
    page: ProductDetail,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/system/admin",
    page: AdminPage,
    isShowHeader: false,
    isPrivate: true,
    isShowFooter: false,
  },
  {
    path: "/intro",
    page: IntroPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/product-author/:id",
    page: ProductAuthorPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/contact",
    page: ContactPage,
    isShowHeader: true,
    isShowFooter: true,
  },
  {
    path: "/my-contact",
    page: MyContactPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/search",
    page: ProductSearchPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/change-password",
    page: ChangePasswordPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/news",
    page: NewsPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "/new-detail/:id",
    page: NewDetailPage,
    isShowHeader: true,
    isShowFooter: false,
  },
  {
    path: "*",
    page: NotFoundPage,
  },
];
