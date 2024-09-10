import {
  CaretDownOutlined,
  SearchOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Badge, Modal, Popover } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { resetUser } from "../../redux/slides/userSlice";
import * as UserService from "../../services/UserService";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import { WrapperContentPopover, WrapperSearch } from "./styles";
import { GoogleLogin } from "@react-oauth/google";
import useMutationHook from "../../hooks/useMutationHook";
import * as Message from "../../components/Message/Message";
import jwt_decode from "jwt-decode";
import { updateUser } from "../../redux/slides/userSlice";
const HeaderComponent = ({ isHiddenSearch = false, isHiddenCart = false }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [valueName, setValueName] = useState("");
  const [valueAvatar, setValueAvatar] = useState("");
  const [valueSearch, setValueSearch] = useState("");

  const user = useSelector((state) => state.user);
  const order = useSelector((state) => state.order);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    setValueName(user?.name);
    setValueAvatar(user?.avatar);
    setIsLoading(false);
  }, [user?.name, user?.avatar]);

  const handleLogout = async () => {
    setIsLoading(true);
    navigate("/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    await UserService.logOutUser();
    dispatch(resetUser());
    setIsLoading(false);
  };

  const handleClickNavigate = (type) => {
    switch (type) {
      case "profile":
        navigate("/user-detail");
        break;
      case "password":
        navigate("/change-password");
        break;
      case "admin":
        navigate("/system/admin");
        break;
      case "order":
        navigate("/my-order", {
          state: {
            id: user?.id,
            token: user?.access_token,
          },
        });
        break;
      case "contact":
        navigate("/my-contact", {
          state: {
            id: user?.id,
            token: user?.access_token,
          },
        });
        break;
      default:
        handleLogout();
    }
  };
  const content = (
    <div>
      <WrapperContentPopover onClick={() => handleClickNavigate("profile")}>
        Thông tin người dùng
      </WrapperContentPopover>
      <WrapperContentPopover onClick={() => handleClickNavigate("password")}>
        Đổi mật khẩu
      </WrapperContentPopover>
      {user?.isAdmin === true && (
        <WrapperContentPopover onClick={() => handleClickNavigate("admin")}>
          Quản lý hệ thống
        </WrapperContentPopover>
      )}
      <WrapperContentPopover onClick={() => handleClickNavigate("order")}>
        Đơn hàng của tôi
      </WrapperContentPopover>
      <WrapperContentPopover onClick={() => handleClickNavigate("contact")}>
        Liên hệ của tôi
      </WrapperContentPopover>
      <WrapperContentPopover onClick={() => handleClickNavigate()}>
        Đăng xuất
      </WrapperContentPopover>
    </div>
  );

  const handleOnChangeSearch = (e) => {
    setValueSearch(e.target.value);
  };

  const handleSearch = () => {
    if (!valueSearch) {
      alert("Vui lòng nhập giá trị để tìm kiếm!");
    } else {
      navigate(`/search?q=${valueSearch}`);
    }
  };

  const handelOnKeyPressSearch = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };
  // need refractor
  // login modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignIn, setIsSignIn] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const mutation = useMutationHook((data) => UserService.loginUser(data));
  const { state: pathProductDetail } = useLocation();
  const { data, isDataLoading } = mutation;
  const handleGetDetailUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refresh_token = JSON.parse(storage);
    const res = await UserService.getUserDetail(id);
    dispatch(
      updateUser({
        ...res?.data,
        access_token: token,
        refresh_token: refresh_token,
      })
    );
  };

  const handleSignIn = () => {
    mutation.mutate({ email, password });
  };
  useEffect(() => {
    if (data?.status === "OK") {
      if (!!pathProductDetail) {
        navigate(`${pathProductDetail}`);
        Message.success("Đăng nhập thành công!");
        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data?.refresh_token)
        );

        if (data?.access_token) {
          // Giải mã access_token bằng JWT decoded
          const decoded = jwt_decode(data?.access_token);
          if (decoded?.id) {
            handleGetDetailUser(decoded?.id, data?.access_token);
          }
        }
        return;
      }

      navigate("/");
      Message.success("Đăng nhập thành công!");
      localStorage.setItem("access_token", JSON.stringify(data?.access_token));
      localStorage.setItem(
        "refresh_token",
        JSON.stringify(data?.refresh_token)
      );
      setIsModalOpen(false);

      if (data?.access_token) {
        // Giải mã access_token bằng JWT decoded
        const decoded = jwt_decode(data?.access_token);
        if (decoded?.id) {
          handleGetDetailUser(decoded?.id, data?.access_token);
        }
      }
    }

    if (data?.status === "ERR") {
      Message.error("Đăng nhập thất bại!");
    }
  }, [data?.status]);
  // sign up modal
  const singupMutation = useMutationHook((data) =>
    UserService.signupUser(data)
  );
  const { singupData, singupIsLoading, isSuccess, isError } = singupMutation;
  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success("Đăng ký tài khoản thành công!");
    } else if (isError) {
      Message.error(data?.message);
    }
  }, [isSuccess]);

  return (
    <>
      <div className="bg-stone-300 flex justify-center ">
        <div className="w-[1285px] h-[70px] flex items-center justify-between py-[10px] overflow-x-auto whitespace-nowrap">
          <div
            onClick={() => navigate("/")}
            className="text-[32px] cursor-pointer text-red-900 font-semibold"
          >
            QBook Store
          </div>

          {!isHiddenSearch && (
            <div className="mx-4">
              <WrapperSearch
                placeholder="truyện tranh..."
                allowClear
                enterButton={
                  <div onClick={handleSearch}>
                    <SearchOutlined /> Tìm kiếm
                  </div>
                }
                size="large"
                value={valueSearch}
                onKeyUp={handelOnKeyPressSearch}
                onChange={handleOnChangeSearch}
              />
            </div>
          )}

          <div className="flex items-center gap-[30px] ml-4">
            <div className="flex items-center gap-1">
              {valueAvatar && (
                <img
                  src={valueAvatar}
                  alt="avatar"
                  className="w-[36px] h-[36px] rounded-[50%] object-cover flex-shrink-0"
                />
              )}

              {user?.access_token ? (
                <LoadingComponent isLoading={isLoading}>
                  <Popover content={content} trigger="hover">
                    <span className="text-black block cursor-pointer">
                      {valueName || user?.email}
                    </span>
                  </Popover>
                </LoadingComponent>
              ) : (
                <div
                  className="flex flex-col text-black cursor-pointer"
                  onClick={() => {
                    setIsModalOpen(true);
                  }}
                >
                  <span>Đăng nhập/Đăng ký</span>
                </div>
              )}
            </div>

            {!isHiddenCart && (
              <div
                className="flex items-center gap-1 cursor-pointer"
                onClick={() => navigate("/order")}
              >
                <Badge count={order.orderItems?.length} size="small">
                  <div className="text-[30px] text-black">
                    <ShoppingCartOutlined />
                  </div>
                </Badge>
              </div>
            )}
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        title={"QBook xin chào"}
        footer={null}
      >
        {isSignIn ? (
          <>
            <div>
              Đăng nhập hoặc{" "}
              <a
                className="text-blue-500"
                onClick={() => {
                  setIsSignIn(false);
                }}
              >
                đăng ký
              </a>
            </div>
            <label className="font-bold py-2">Email</label>
            <div className="my-2">
              <input
                type="text"
                className="w-full h-8 border rounded"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <label className="font-bold py-2">Mật khẩu</label>
            <div className="my-2">
              <input
                type="password"
                className="w-full h-8 border rounded"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <div className="mt-4">
              <button
                className="w-full rounded bg-green-300 p-2"
                onClick={handleSignIn}
              >
                Đăng nhập
              </button>
            </div>
            <div className="text-center font-bold p-2">
              ------------ Đăng nhập bằng Google ------------
            </div>
            <div className="flex justify-center items-center">
              <GoogleLogin></GoogleLogin>
            </div>
          </>
        ) : (
          <>
            <div>
              Đã có tài khoản?{" "}
              <a
                className="text-blue-500"
                onClick={() => {
                  setIsSignIn(true);
                }}
              >
                đăng nhập
              </a>
            </div>
            <label className="font-bold py-2">Họ và tên</label>
            <div className="my-2">
              <input type="text" className="w-full h-8 border rounded"></input>
            </div>
            <label className="font-bold py-2">Email</label>
            <div className="my-2">
              <input
                type="text"
                className="w-full h-8 border rounded"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></input>
            </div>
            <label className="font-bold py-2">Mật khẩu</label>
            <div className="my-2">
              <input
                type="password"
                className="w-full h-8 border rounded"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>
            </div>
            <label className="font-bold py-2">Nhập lại mật khẩu</label>
            <div className="my-2">
              <input
                type="password"
                className="w-full h-8 border rounded"
              ></input>
            </div>
            <div className="mt-4">
              <button className="w-full rounded bg-green-300 p-2">
                Đăng ký
              </button>
            </div>
            {/* <div className="text-center font-bold p-2">
              ------------ Đăng nhập bằng Google ------------
            </div>
            <div>
              <GoogleLogin></GoogleLogin>
            </div> */}
          </>
        )}
      </Modal>
    </>
  );
};

export default HeaderComponent;
