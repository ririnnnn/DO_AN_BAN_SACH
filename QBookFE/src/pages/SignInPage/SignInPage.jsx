import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Image } from "antd";
import jwt_decode from "jwt-decode";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import imageForm from "../../assets/images/logo-signin.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import { updateUser } from "../../redux/slides/userSlice";
import * as UserService from "../../services/UserService";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { state: pathProductDetail } = useLocation();

  const handleNavigateSignUp = () => {
    navigate("/sign-up");
  };

  const mutation = useMutationHook((data) => UserService.loginUser(data));

  const { data, isLoading } = mutation;

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

  const handleKeyDown = (e) => {
    if (email && password) {
      if (e.key === "Enter") {
        mutation.mutate({ email, password });
      }
    }
  };

  return (
    <div className="flex items-center justify-center bg-[#cccccc] h-[100vh]">
      <div className="flex max-w-[800px] h-[410px] rounded-md bg-white">
        <div className="min-w-[330px] lg:min-w-[500px] px-6 lg:p-10 flex flex-col justify-center">
          <h1 className="text-lg font-semibold py-1">Xin chào</h1>
          <span className="text-base py-1">Đăng nhập và tạo tài khoản</span>

          <InputForm
            placeholder="abc@gmail.com"
            style={{ margin: "10px 0" }}
            type="email"
            size="large"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div className="relative">
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              className="absolute z-10 top-[7px] right-3 cursor-pointer"
            >
              {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="password"
              size="large"
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {data?.status === "ERR" && (
              <span className="text-base text-red-500 block pt-3">
                {data?.message}
              </span>
            )}
          </div>
          <LoadingComponent isLoading={isLoading}>
            <ButtonComponent
              buttonText="Đăng nhập"
              styleButton={{
                backgroundColor: "rgb(255, 66, 78)",
                width: "100%",
                height: "42px",
                border: "none",
                margin: "26px 0",
              }}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
              disabled={!email || !password}
              onClick={handleSignIn}
            />
          </LoadingComponent>
          <div className="text-base flex gap-2">
            <span>Chưa có tài khoản?</span>
            <span
              className="text-[#0d5cb6] cursor-pointer"
              onClick={handleNavigateSignUp}
            >
              Tạo tài khoản
            </span>
          </div>
        </div>

        <div className="hidden md:block md:min-w-[300px] bg-[#c7ecee]">
          <div className="w-full h-full flex flex-col items-center justify-center">
            <Image
              src={imageForm}
              width="203px"
              height="203px"
              preview={false}
            />
            <h4 className="text-base font-semibold py-5">Mua sắm tại QBook</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
