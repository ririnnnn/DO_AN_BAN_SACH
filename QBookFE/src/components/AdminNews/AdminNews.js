import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined
} from "@ant-design/icons";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { Button, Form } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as NewService from "../../services/NewService";
import { getBase64 } from "../../utils/utils";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";

const AdminNews = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [dataNewAdmin, setDataNewAdmin] = useState([]);
  const [totalNew, setTotalNew] = useState(10);
  const [isLoadingNew, setIsLoadingNew] = useState(false);

  const user = useSelector((state) => state.user);

  const [stateNew, setStateNew] = useState({
    title: "",
    image: "",
    ckeditor: "",
  });

  const [stateDetailNew, setStateDetailNew] = useState({
    title: "",
    image: "",
    ckeditor: "",
  });

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data }) => {
    const res = NewService.updateNew(id, data);
    return res;
  });

  const mutationDelete = useMutationHook(({ id }) => {
    const res = NewService.deleteNew(id);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids }) => {
    const res = NewService.deleteManyNew(ids);
    return res;
  });

  const mutationCreate = useMutationHook(({ data }) => {
    const res = NewService.createNew(data);
    return res;
  });

  const {
    data: dataCreateNew,
    isSuccess: isSuccessCreateNew,
    isError: isErrorCreateNew,
  } = mutationCreate;

  const {
    data: dataUpdateNew,
    isSuccess: isSuccessUpdateNew,
    isLoading: isLoadingUpdateNew,
  } = mutationUpdate;

  const {
    data: dataDeleteNew,
    isSuccess: isSuccessDeleteNew,
    isLoading: isLoadingDeleteNew,
  } = mutationDelete;

  const { data: dataDeleteManyNew, isSuccess: isSuccessDeleteManyNew } =
    mutationDeleteMany;

  useEffect(() => {
    const fetchNewAdmin = async () => {
      setIsLoadingNew(true);
      const res = await NewService.getNew(pageValue, 10);
      setDataNewAdmin(res?.data);
      setTotalNew(res?.totalNew);
      setIsLoadingNew(false);
    };

    fetchNewAdmin();
  }, [
    pageValue,
    isSuccessCreateNew,
    isSuccessUpdateNew,
    isSuccessDeleteNew,
    isSuccessDeleteManyNew,
  ]);

  const dataNewTable = dataNewAdmin.map((item) => {
    return { ...item, key: item._id };
  });

  useEffect(() => {
    if (isSuccessCreateNew && dataCreateNew?.status === "OK") {
      Message.success("Tạo tin tức mới thành công!");
      setStateNew({
        title: "",
        image: "",
        ckeditor: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    } else if (isErrorCreateNew) {
      Message.error("Tạo tin tức mới thất bại!");
      setStateNew({
        title: "",
        image: "",
        ckeditor: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateNew]);

  useEffect(() => {
    if (isSuccessUpdateNew && dataUpdateNew?.status === "OK") {
      Message.success("Cập nhật thông tin tin tức thành công!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateNew?.status === "ERROR") {
      Message.error("Cập nhật thông tin tin tức thất bại!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateNew]);

  useEffect(() => {
    if (isSuccessDeleteNew && dataDeleteNew?.status === "OK") {
      Message.success("Xóa tin tức thành công!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteNew?.status === "ERROR") {
      Message.success("Xóa tin tức thất bại!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteNew]);

  useEffect(() => {
    if (isSuccessDeleteManyNew && dataDeleteManyNew?.status === "OK") {
      Message.success("Xóa nhiều tin tức thành công!");
    } else if (dataDeleteNew?.status === "ERROR") {
      Message.success("Xóa nhiều tin tức thất bại!");
    }
  }, [isSuccessDeleteManyNew]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    formCreate.resetFields();
    setStateNew({
      ...stateNew,
      image: "",
    });
    setIsOpenModalCreate(false);
  };

  const handleCreateNew = () => {
    mutationCreate.mutate({
      data: stateNew,
    });
  };

  const handleOnChange = (e) => {
    setStateNew({
      ...stateNew,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailNew({
      ...stateDetailNew,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchDetailNew = async () => {
      const res = await NewService.getDetailNew(isRowSelected);
      setStateDetailNew({
        title: res?.data?.title,
        image: res?.data?.image,
        ckeditor: res?.data?.ckeditor,
      });
    };

    fetchDetailNew();
  }, [isRowSelected]);

  useEffect(() => {
    if (isOpenModalEdit) {
      formUpdate.setFieldsValue(stateDetailNew);
    } else {
      formUpdate.resetFields();
    }
  }, [formUpdate, stateDetailNew, isOpenModalEdit]);

  const handleGetDetailNew = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateNew = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateDetailNew,
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
          onClick={handleGetDetailNew}
        />
      </div>
    );
  };

  const columns = [
    {
      title: "Mã tin tức",
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
      title: "Tiêu đề tin tức",
      dataIndex: "title",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyNew = (ids) => {
    if (
      window.confirm("Bạn có chắc chắn muốn xóa nhiều tin tức không?") === true
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

    setStateNew({
      ...stateNew,
      image: file.preview,
    });
  };

  const handleOnChangeDetailImage = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateDetailNew({
      ...stateDetailNew,
      image: file.preview,
    });
  };

  return (
    <div>
      <WrapperHeader>Quản lý tin tức</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo tin tức mới"
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
          onFinish={handleCreateNew}
          autoComplete="off"
          form={formCreate}
        >
          <Form.Item
            label="Tiêu đề tin tức"
            name="title"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tiêu đề tin tức!",
              },
            ]}
          >
            <InputComponent
              value={stateNew.title}
              onChange={handleOnChange}
              name="title"
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập hình ảnh tin tức!",
              },
            ]}
          >
            <WrapperUpload onChange={handleOnChangeImage} maxCount={1}>
              <Button className={stateNew.image ? "btn-upload" : null}>
                Upload
              </Button>
              {stateNew.image && (
                <img
                  src={stateNew.image}
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
            label="Nội dung tin tức"
            name="ckeditor"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập nội dung tin tức!",
              },
            ]}
          >
            <CKEditor
              editor={ClassicEditor}
              onReady={(editor) => {
                // console.log("Editor is ready to use!", editor);
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setStateNew({
                  ...stateNew,
                  ckeditor: data,
                });
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
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </ModalComponent>

      <ModalComponent
        title="Xóa tin tức"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDeleteGenre}
      >
        <LoadingComponent isLoading={isLoadingDeleteNew}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa tin tức có mã "${isRowSelected}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        title="Chi tiết tin tức"
        onClose={() => setIsOpenModalEdit(false)}
        width="75%"
      >
        <LoadingComponent isLoading={isLoadingUpdateNew}>
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
            onFinish={handleUpdateNew}
            autoComplete="off"
            form={formUpdate}
          >
            <Form.Item
              label="Tiêu đề tin tức"
              name="title"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tiêu đề tin tức!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailNew.title}
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
                  message: "Vui lòng nhập hình ảnh tin tức!",
                },
              ]}
            >
              <WrapperUpload onChange={handleOnChangeDetailImage} maxCount={1}>
                <Button className={stateDetailNew.image ? "btn-upload" : null}>
                  Upload
                </Button>
                {stateDetailNew.image && (
                  <img
                    src={stateDetailNew.image}
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
              label="Nội dung tin tức"
              name="ckeditor"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập nội dung tin tức!",
                },
              ]}
            >
              <CKEditor
                editor={ClassicEditor}
                data={stateDetailNew.ckeditor}
                onReady={(editor) => {
                  // console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const data = editor.getData();
                  setStateDetailNew((prevState) => ({
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
          isLoading={isLoadingNew}
          columns={columns}
          data={dataNewTable}
          pageValue={pageValue}
          totalPagination={totalNew}
          handleDelete={handleDeleteManyNew}
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
  );
};

export default AdminNews;
