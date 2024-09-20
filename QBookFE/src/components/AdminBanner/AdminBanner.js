import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as BannerService from "../../services/BannerService";
import { getBase64 } from "../../utils/utils";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";

const AdminBanner = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [dataBannerAdmin, setDataBannerAdmin] = useState([]);
  const [totalBanner, setTotalBanner] = useState(10);
  const [isLoadingBanner, setIsLoadingBanner] = useState(false);
  const user = useSelector((state) => state.user);

  const [stateBanner, setStateBanner] = useState({
    desc: "",
    image: "",
    activeFrom: "",
    activeTo: "",
  });

  const [stateDetailBanner, setStateDetailBanner] = useState({
    desc: "",
    image: "",
    activeFrom: "",
    activeTo: "",
  });

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data }) => {
    const res = BannerService.updateBanner(id, data);
    return res;
  });

  const mutationDelete = useMutationHook(({ id }) => {
    const res = BannerService.deleteBanner(id);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids }) => {
    const res = BannerService.deleteManyBanner(ids);
    return res;
  });

  const mutationCreate = useMutationHook(({ data }) => {
    const res = BannerService.createBanner(data);
    return res;
  });

  const {
    data: dataCreateBanner,
    isSuccess: isSuccessCreateBanner,
    isError: isErrorCreateBanner,
  } = mutationCreate;

  const {
    data: dataUpdateBanner,
    isSuccess: isSuccessUpdateBanner,
    isLoading: isLoadingUpdateBanner,
  } = mutationUpdate;

  const {
    data: dataDeleteBanner,
    isSuccess: isSuccessDeleteBanner,
    isLoading: isLoadingDeleteBanner,
  } = mutationDelete;

  const { data: dataDeleteManyBanner, isSuccess: isSuccessDeleteManyBanner } =
    mutationDeleteMany;
  useEffect(() => {
    const fetchBannerAdmin = async () => {
      setIsLoadingBanner(true);
      const res = await BannerService.getBanner(pageValue, 10);
      setDataBannerAdmin(res?.data);
      setTotalBanner(res?.totalBanner);
      setIsLoadingBanner(false);
    };

    fetchBannerAdmin();
  }, [
    pageValue,
    isSuccessCreateBanner,
    isSuccessUpdateBanner,
    isSuccessDeleteBanner,
    isSuccessDeleteManyBanner,
  ]);

  const dataBannerTable = dataBannerAdmin.map((item) => {
    return { ...item, key: item._id };
  });
  useEffect(() => {
    if (isSuccessCreateBanner && dataCreateBanner?.status === "OK") {
      Message.success("Tạo banner thành công!");
      setStateBanner({
        desc: "",
        image: "",
        activeFrom: "",
        activeTo: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    } else if (isErrorCreateBanner) {
      Message.error("Tạo banner thất bại!");
      setStateBanner({
        desc: "",
        image: "",
        activeFrom: "",
        activeTo: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateBanner]);

  useEffect(() => {
    if (isSuccessUpdateBanner && dataUpdateBanner?.status === "OK") {
      Message.success("Cập nhật thông tin banner thành công!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateBanner?.status === "ERROR") {
      Message.error("Cập nhật thông tin banner thất bại!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateBanner]);

  useEffect(() => {
    if (isSuccessDeleteBanner && dataDeleteBanner?.status === "OK") {
      Message.success("Xóa banner thành công!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteBanner?.status === "ERROR") {
      Message.success("Xóa banner thất bại!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteBanner]);
  useEffect(() => {
    if (isSuccessDeleteManyBanner && dataDeleteManyBanner?.status === "OK") {
      Message.success("Xóa nhiều banner thành công!");
    } else if (dataDeleteBanner?.status === "ERROR") {
      Message.success("Xóa nhiều banner thất bại!");
    }
  }, [isSuccessDeleteManyBanner]);
  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    formCreate.resetFields();
    setStateBanner({
      ...stateBanner,
      image: "",
    });
    setIsOpenModalCreate(false);
  };

  const handleCreateBanner = () => {
    mutationCreate.mutate({
      data: stateBanner,
    });
  };

  const handleOnChange = (e) => {
    setStateBanner({
      ...stateBanner,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailBanner({
      ...stateDetailBanner,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchDetailBanner = async () => {
      const res = await BannerService.getDetailBanner(isRowSelected);
      setStateDetailBanner({
        desc: res?.data?.desc,
        image: res?.data?.image,
        activeFrom: res?.data?.activeFrom,
        activeTo: res?.data?.activeTo,
      });
    };

    fetchDetailBanner();
  }, [isRowSelected]);

  useEffect(() => {
    if (isOpenModalEdit) {
      formUpdate.setFieldsValue(stateDetailBanner);
    } else {
      formUpdate.resetFields();
    }
  }, [formUpdate, stateDetailBanner, isOpenModalEdit]);

  const handleGetDetailBanner = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateBanner = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateDetailBanner,
    });
  };

  const handleDeleteGenre = () => {
    mutationDelete.mutate({
      id: isRowSelected,
    });
  };

  const renderIcons = () => {
    return (
      <div>
        <DeleteOutlined
          style={{
            fontSize: "26px",
            color: "red",
            cursor: "pointer",
            marginRight: "10px",
          }}
          onClick={() => setIsOpenModalDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: "26px", color: "orange", cursor: "pointer" }}
          onClick={handleGetDetailBanner}
        />
      </div>
    );
  };
  const columns = [
    {
      title: "Mã banner",
      dataIndex: "_id",
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      render: (image) => (
        <img
          alt={image}
          src={image}
          width="150px"
          height="150px"
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      title: "Ngày hoạt động từ",
      dataIndex: "activeFrom",
    },
    {
      title: "Ngày hoạt động tới",
      dataIndex: "activeTo",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];
  const handleDeleteManyBanner = (ids) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa nhiều banner không?") === true
    ) {
      mutationDeleteMany.mutate({ ids: ids });
    }
  };

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  const handleOnChangeImage = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateBanner({
      ...stateBanner,
      image: file.preview,
    });
  };

  const handleOnChangeDetailImage = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateDetailBanner({
      ...stateDetailBanner,
      image: file.preview,
    });
  };

  return (
    <>
      <div>
        <WrapperHeader>Quản lý Banner</WrapperHeader>
        <button
          className="bg-green-300 rounded py-[10px] px-5 font-bold"
          onClick={showModal}
        >
          Thêm
        </button>

        <ModalComponent
          title="Tạo banner mới"
          open={isOpenModalCreate}
          onCancel={handleCancelModalCreate}
          footer={null}
          width={1200}
        >
          <Form
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 26,
            }}
            style={{
              maxWidth: 1100,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={() => {
              handleCreateBanner();
            }}
            autoComplete="off"
            form={formCreate}
          >
            <Form.Item
              label="Mô tả banner"
              name="desc"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả banner!",
                },
              ]}
            >
              <InputComponent
                value={stateBanner.title}
                onChange={handleOnChange}
                name="desc"
              />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập hình ảnh banner!",
                },
              ]}
            >
              <WrapperUpload onChange={handleOnChangeImage} maxCount={1}>
                <Button className={stateBanner.image ? "btn-upload" : null}>
                  Upload
                </Button>
                {stateBanner.image && (
                  <img
                    src={stateBanner.image}
                    alt="avatar"
                    style={{
                      width: "60px",
                      height: "60px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      marginLeft: "20px",
                    }}
                  />
                )}
              </WrapperUpload>
            </Form.Item>

            <Form.Item
              label="Ngày hoạt động từ"
              name="activeFrom"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày banner hoạt động từ!",
                },
              ]}
            >
              <InputComponent
                value={stateBanner.activeFrom}
                onChange={handleOnChange}
                name="activeFrom"
                type={"date"}
              />
            </Form.Item>
            <Form.Item
              label="Ngày hoạt động tới"
              name="activeTo"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập ngày banner hoạt động tới!",
                },
              ]}
            >
              <InputComponent
                value={stateBanner.activeTo}
                onChange={handleOnChange}
                name="activeTo"
                type={"date"}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 22,
                span: 16,
              }}
            >
              <Button type="primary" htmlType="submit">
                Tạo mới
              </Button>
            </Form.Item>
          </Form>
        </ModalComponent>

        <ModalComponent
          title="Xóa banner"
          open={isOpenModalDelete}
          onCancel={() => setIsOpenModalDelete(false)}
          onOk={handleDeleteGenre}
        >
          <LoadingComponent isLoading={isLoadingDeleteBanner}>
            <div
              style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
            >{`Bạn có chắc chắn muốn xóa banner có mã "${isRowSelected}" này không?`}</div>
          </LoadingComponent>
        </ModalComponent>

        <DrawerComponent
          open={isOpenModalEdit}
          title="Chi tiết banner"
          onClose={() => setIsOpenModalEdit(false)}
          width="75%"
        >
          <LoadingComponent isLoading={isLoadingUpdateBanner}>
            <Form
              name="basic"
              labelCol={{
                span: 4,
              }}
              wrapperCol={{
                span: 26,
              }}
              style={{
                maxWidth: 1100,
              }}
              initialValues={{
                remember: true,
              }}
              onFinish={handleUpdateBanner}
              autoComplete="off"
              form={formUpdate}
            >
              <Form.Item
                label="Tiêu đề banner"
                name="title"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập tiêu đề banner!",
                  },
                ]}
              >
                <InputComponent
                  value={stateDetailBanner.title}
                  onChange={handleOnChangeDetail}
                  name="title"
                />
              </Form.Item>

              <Form.Item
                label="Hình ảnh"
                name="image"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập hình ảnh banner!",
                  },
                ]}
              >
                <WrapperUpload
                  onChange={handleOnChangeDetailImage}
                  maxCount={1}
                >
                  <Button
                    className={stateDetailBanner.image ? "btn-upload" : null}
                  >
                    Upload
                  </Button>
                  {stateDetailBanner.image && (
                    <img
                      src={stateDetailBanner.image}
                      alt="avatar"
                      style={{
                        width: "60px",
                        height: "60px",
                        borderRadius: "50%",
                        objectFit: "cover",
                        marginLeft: "20px",
                      }}
                    />
                  )}
                </WrapperUpload>
              </Form.Item>

              <Form.Item
                label="Nội dung banner"
                name="ckeditor"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nội dung banner!",
                  },
                ]}
              >
                <CKEditor
                  editor={ClassicEditor}
                  data={stateDetailBanner.ckeditor}
                  onReady={(editor) => {
                    // console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    setStateDetailBanner((prevState) => ({
                      ...prevState,
                      ckeditor: data,
                    }));
                  }}
                />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  offset: 22,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </LoadingComponent>
        </DrawerComponent>

        <div style={{ marginTop: "20px" }}>
          <TableComponent
            isLoading={isLoadingBanner}
            columns={columns}
            data={dataBannerTable}
            pageValue={pageValue}
            totalPagination={totalBanner}
            handleDelete={handleDeleteManyBanner}
            handleOnChangePage={handleOnChangePage}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  setIsRowSelected(record._id);
                },
              };
            }}
          />
        </div>
      </div>
    </>
  );
};
export default AdminBanner;
