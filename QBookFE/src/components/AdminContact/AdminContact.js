import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as ContactService from "../../services/ContactService";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader } from "./styles";
import { sortDate } from "../../utils/sorts";

const AdminContact = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [dataContactAdmin, setDataContactAdmin] = useState([]);
  const [totalContact, setTotalContact] = useState(10);
  const [isLoadingContact, setIsLoadingContact] = useState(false);

  const searchInput = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const user = useSelector((state) => state.user);

  const [stateContact, setStateContact] = useState({
    userName: "",
    email: "",
    address: "",
    content: "",
  });

  const [stateDetailContact, setStateDetailContact] = useState({
    userName: "",
    email: "",
    address: "",
    content: "",
  });

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data }) => {
    const res = ContactService.updateContact(id, data);
    return res;
  });

  const mutationDelete = useMutationHook(({ id }) => {
    const res = ContactService.deleteContact(id);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids }) => {
    const res = ContactService.deleteManyContact(ids);
    return res;
  });

  const mutationCreate = useMutationHook(({ data }) => {
    const res = ContactService.createContact(data);
    return res;
  });

  const { data: dataCreateContact, isSuccess: isSuccessCreateContact } =
    mutationCreate;

  const {
    data: dataUpdateContact,
    isSuccess: isSuccessUpdateContact,
    isLoading: isLoadingUpdateContact,
  } = mutationUpdate;

  const {
    data: dataDeleteContact,
    isSuccess: isSuccessDeleteContact,
    isLoading: isLoadingDeleteContact,
  } = mutationDelete;

  const { data: dataDeleteManyContact, isSuccess: isSuccessDeleteManyContact } =
    mutationDeleteMany;

  const getContactAdmin = async () => {
    setIsLoadingContact(true);
    const res = await ContactService.getContactAdmin(pageValue, 10);
    setDataContactAdmin(res?.data);
    setTotalContact(res?.totalContact);
    setIsLoadingContact(false);
  };

  useEffect(() => {
    getContactAdmin();
  }, [
    pageValue,
    isSuccessCreateContact,
    isSuccessUpdateContact,
    isSuccessDeleteContact,
    isSuccessDeleteManyContact,
  ]);

  const dataContactTable = dataContactAdmin.map((contact) => {
    return { ...contact, key: contact._id };
  });

  useEffect(() => {
    if (isSuccessCreateContact && dataCreateContact?.status === "OK") {
      Message.success("Tạo liên hệ mới thành công!");
      setStateContact({
        userName: "",
        email: "",
        address: "",
        content: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    } else if (dataCreateContact?.status === "ERROR") {
      Message.error("Tạo liên hệ mới thất bại!");
      setStateContact({
        userName: "",
        email: "",
        address: "",
        content: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateContact]);

  useEffect(() => {
    if (isSuccessUpdateContact && dataUpdateContact?.status === "OK") {
      Message.success("Cập nhật thông tin liên hệ thành công!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateContact?.status === "ERROR") {
      Message.error("Cập nhật thông tin liên hệ thất bại!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateContact]);

  useEffect(() => {
    if (isSuccessDeleteContact && dataDeleteContact?.status === "OK") {
      Message.success("Xóa liên hệ thành công!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteContact?.status === "ERROR") {
      Message.success("Xóa liên hệ thất bại!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteContact]);

  useEffect(() => {
    if (isSuccessDeleteManyContact && dataDeleteManyContact?.status === "OK") {
      Message.success("Xóa nhiều liên hệ thành công!");
    } else if (dataDeleteContact?.status === "ERROR") {
      Message.success("Xóa nhiều liên hệ thất bại!");
    }
  }, [isSuccessDeleteManyContact]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    formCreate.resetFields();
    setIsOpenModalCreate(false);
  };

  const newStateContact = {
    userName: stateContact.userName,
    email: stateContact.email,
    address: stateContact.address,
    content: stateContact.content,
    userId: user?.id,
  };

  const handleCreateContact = () => {
    mutationCreate.mutate({
      data: newStateContact,
    });
  };

  const handleOnChange = (e) => {
    setStateContact({
      ...stateContact,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailContact({
      ...stateDetailContact,
      [e.target.name]: e.target.value,
    });
  };

  const fetchDetailContact = async () => {
    const res = await ContactService.getDetailContact(isRowSelected);
    setStateDetailContact({
      userName: res?.data?.userName,
      email: res?.data?.email,
      address: res?.data?.address,
      content: res?.data?.content,
    });
  };

  useEffect(() => {
    if (isRowSelected && isOpenModalEdit) {
      fetchDetailContact();
    }
  }, [isRowSelected]);

  useEffect(() => {
    if (isOpenModalEdit) {
      formUpdate.setFieldsValue(stateDetailContact);
    } else {
      formUpdate.resetFields();
    }
  }, [formUpdate, stateDetailContact, isOpenModalEdit]);

  const handleGetDetailContact = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateContact = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateDetailContact,
    });
  };

  const handleDeleteContact = () => {
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
          onClick={handleGetDetailContact}
        />
      </div>
    );
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <InputComponent
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#1677ff" : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
  });

  const columns = [
    {
      title: "Mã liên hệ",
      dataIndex: "_id",
    },
    {
      title: "Mã người dùng",
      dataIndex: "userId",
    },
    {
      title: "Tên người gửi",
      dataIndex: "userName",
      sorter: (a, b) => a.userName.length - b.userName.length,
      ...getColumnSearchProps("userName"),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Địa chỉ người gửi",
      dataIndex: "address",
    },
    {
      title: "Nội dung",
      dataIndex: "content",
      sorter: (a, b) => a.content.length - b.content.length,
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyContact = (ids) => {
    mutationDeleteMany.mutate({ ids });
  };

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  return (
    <div>
      <WrapperHeader>Quản lý liên hệ</WrapperHeader>
      <button
        className="bg-green-300 rounded py-[10px] px-5 font-bold"
        onClick={showModal}
      >
        Thêm
      </button>

      <ModalComponent
        title="Tạo liên hệ mới"
        open={isOpenModalCreate}
        onCancel={handleCancelModalCreate}
        footer={null}
      >
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 20,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={handleCreateContact}
          autoComplete="off"
          form={formCreate}
        >
          <Form.Item
            label="Tên người gửi"
            name="userName"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên người gửi!",
              },
            ]}
          >
            <InputComponent
              value={stateContact.userName}
              onChange={handleOnChange}
              name="userName"
            />
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
            <InputComponent
              value={stateContact.email}
              onChange={handleOnChange}
              name="email"
            />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập địa chỉ người gửi!",
              },
            ]}
          >
            <InputComponent
              value={stateContact.address}
              onChange={handleOnChange}
              name="address"
            />
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
              value={stateContact.content}
              onChange={handleOnChange}
              name="content"
              rows={4}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 20,
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
        title="Xóa liên hệ"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDeleteContact}
      >
        <LoadingComponent isLoading={isLoadingDeleteContact}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa liên hệ có id "${isRowSelected}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        title="Chi tiết liên hệ"
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateContact}>
          <Form
            name="basic"
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 20,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleUpdateContact}
            autoComplete="off"
            form={formUpdate}
          >
            <Form.Item
              label="Họ tên người gửi"
              name="userName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập họ tên người gửi!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailContact.userName}
                onChange={handleOnChangeDetail}
                name="userName"
              />
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
              <InputComponent
                value={stateDetailContact.email}
                onChange={handleOnChangeDetail}
                name="email"
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
              <InputComponent
                value={stateDetailContact.address}
                onChange={handleOnChangeDetail}
                name="address"
              />
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
                value={stateDetailContact.content}
                onChange={handleOnChangeDetail}
                name="content"
                rows={8}
              />
            </Form.Item>

            <Form.Item
              wrapperCol={{
                offset: 21,
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
          isLoading={isLoadingContact}
          columns={columns}
          data={dataContactTable}
          pageValue={pageValue}
          totalPagination={totalContact}
          handleDelete={handleDeleteManyContact}
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

export default AdminContact;
