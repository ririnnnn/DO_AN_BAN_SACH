import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Image } from "antd";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import imageForm from "../../assets/images/logo-signin.png";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserService";
import {
  WrapperContainer,
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperForm,
  WrapperTextLight,
} from "./styles";

const STYLES_ICON = {
  fontSize: "16px",
  position: "absolute",
  zIndex: "10",
  top: "14px",
  right: "16px",
  cursor: "pointer",
};

const STYLES_MESSAGE = {
  fontSize: "15px",
  color: "red",
  display: "block",
  paddingTop: "10px",
};

const SignUpPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirm, setIsShowConfirm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const mutation = useMutationHook((data) => UserService.signupUser(data));

  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    if (isSuccess && data?.status === "OK") {
      Message.success("Đăng ký tài khoản thành công!");
      handleNavigateLogin();
    } else if (isError) {
      Message.error(data?.message);
    }
  }, [isSuccess]);

  const handleNavigateLogin = () => {
    navigate("/sign-in");
  };

  const handleKeyDown = (e) => {
    if (email && password && confirmPassword) {
      if (e.key === "Enter") {
        mutation.mutate({ email, password, confirmPassword });
      }
    }
  };

  const handleSignUp = () => {
    mutation.mutate({ email, password, confirmPassword });
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
              onClick={() => {
                setIsShowPassword(!isShowPassword);
              }}
              className="absolute z-10 top-[7px] right-3 cursor-pointer"
            >
              {isShowPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="password"
              size="large"
              type={isShowPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>

          <div className="relative mt-[10px]">
            <span
              onClick={() => {
                setIsShowConfirm(!isShowConfirm);
              }}
              className="absolute z-10 top-[7px] right-3 cursor-pointer"
            >
              {isShowConfirm ? <EyeOutlined /> : <EyeInvisibleOutlined />}
            </span>
            <InputForm
              placeholder="confirm password"
              size="large"
              type={isShowConfirm ? "text" : "password"}
              onChange={(e) => setConfirmPassword(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            {data?.status === "ERROR" && (
              <span style={STYLES_MESSAGE}>{data?.message}</span>
            )}
          </div>

          <LoadingComponent isLoading={isLoading}>
            <ButtonComponent
              buttonText="Đăng ký"
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
              disabled={!email || !password || !confirmPassword}
              onClick={handleSignUp}
            />
          </LoadingComponent>
          <div className="text-base flex gap-2">
            <span>Đã có tài khoản?</span>
            <span
              className="text-[#0d5cb6] cursor-pointer"
              onClick={handleNavigateLogin}
            >
              Đăng nhập
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

export default SignUpPage;
