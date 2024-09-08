import {
  EnvironmentOutlined,
  PhoneOutlined,
  QuestionOutlined,
} from "@ant-design/icons";
import { Button, Form, Input } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingComponent from "../../components/LoadingComponent/LoadingComponent";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as ContactService from "../../services/ContactService";
import {
  WrapperContact,
  WrapperContactForm,
  WrapperContactItems,
  WrapperContactItemsContent,
  WrapperContactItemsIcon,
  WrapperContactItemsTitle,
  WrapperContactList,
  WrapperContactNavigate,
  WrapperContactNavigateHome,
} from "./styles";

function ContactPage() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const user = useSelector((state) => state.user);

  const mutationCreate = useMutationHook(({ data }) => {
    const res = ContactService.createContact(data);
    return res;
  });

  const {
    data: dataCreate,
    isLoading: isLoadingCreate,
    isSuccess: isSuccessCreate,
  } = mutationCreate;

  useEffect(() => {
    if (isSuccessCreate && dataCreate?.status === "OK") {
      Message.success("Tạo liên hệ mới thành công!");
      form.resetFields();
    }
  }, [isSuccessCreate]);

  const onFinish = () => {
    if (user.id !== "") {
      mutationCreate.mutate({
        data: { userName, email, address, content, userId: user?.id },
      });
    } else {
      navigate("/sign-in");
    }
  };

  return (
    <div className="bg-[#f5f5fa]">
      <div className="w-[1285px] h-[100%] mx-auto my-0">
        <div className="text-base py-4">
          <span
            className="font-semibold cursor-pointer"
            onClick={() => navigate("/")}
          >
            Trang chủ
          </span>
          <span> / Liên hệ</span>
        </div>

        <div>
          <div className="flex justify-between gap-5 pb-5">
            <div className="flex w-[410px] bg-white p-3 rounded-lg">
              <div className="w-10 h-10 leading-[34px] bg-[#228b22] rounded-[50%] text-center text-white">
                <EnvironmentOutlined />
              </div>
              <div className="w-calc-100-minus-40 pl-3 text-base">
                <div className="font-semibold">Địa chỉ:</div>
                <div>Hải Trung, Hải Hậu, Nam Định</div>
              </div>
            </div>

            <div className="flex w-[410px] bg-white p-3 rounded-lg">
              <div className="w-10 h-10 leading-[34px] bg-[#228b22] rounded-[50%] text-center text-white">
                <QuestionOutlined />
              </div>
              <div className="w-calc-100-minus-40 pl-3 text-base">
                <div className="font-semibold">Gửi thắc mắc:</div>
                <div>trantung310502@gmail.com</div>
              </div>
            </div>

            <div className="flex w-[410px] bg-white p-3 rounded-lg">
              <div className="w-10 h-10 leading-[34px] bg-[#228b22] rounded-[50%] text-center text-white">
                <PhoneOutlined />
              </div>
              <div className="w-calc-100-minus-40 pl-3 text-base">
                <div className="font-semibold">Điện thoại:</div>
                <div>0369554336</div>
              </div>
            </div>
          </div>

          <LoadingComponent isLoading={isLoadingCreate}>
            <WrapperContactForm>
              <Form
                name="basic"
                initialValues={{
                  remember: true,
                }}
                onFinish={() => onFinish()}
                onFinishFailed={() => {}}
                autoComplete="off"
                form={form}
              >
                <Form.Item
                  label="Họ và tên"
                  name="userName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ và tên!",
                    },
                  ]}
                >
                  <Input onChange={(e) => setUserName(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập email!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) => setEmail(e.target.value)}
                    type="email"
                  />
                </Form.Item>

                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập địa chỉ!",
                    },
                  ]}
                >
                  <Input onChange={(e) => setAddress(e.target.value)} />
                </Form.Item>

                <Form.Item
                  label="Nội dung"
                  name="content"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập nội dung!",
                    },
                  ]}
                >
                  <TextArea
                    rows={4}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </Form.Item>

                <Form.Item
                  style={{
                    textAlign: "center",
                  }}
                >
                  <Button type="primary" htmlType="submit" className="mb-5">
                    Gửi liên hệ
                  </Button>
                </Form.Item>
              </Form>
            </WrapperContactForm>
          </LoadingComponent>
        </div>
      </div>
    </div>
  );
}

export default ContactPage;
