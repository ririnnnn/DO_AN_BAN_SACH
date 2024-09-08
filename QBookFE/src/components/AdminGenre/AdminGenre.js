import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as GenreService from "../../services/GenreService";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader } from "./styles";

const AdminGenre = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameGenre, setIsNameGenre] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [dataGenreAdmin, setDataGenreAdmin] = useState([]);
  const [totalGenre, setTotalGenre] = useState(10);
  const [isLoadingGenre, setIsLoadingGenre] = useState(false);

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

  const [stateGenre, setStateGenre] = useState({
    name: "",
  });

  const [stateDetailGenre, setStateDetailGenre] = useState({
    name: "",
  });

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = GenreService.updateGenre(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = GenreService.deleteGenre(id, access_token);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = GenreService.deleteManyGenre(ids, access_token);
    return res;
  });

  const mutationCreate = useMutationHook(({ data, access_token }) => {
    const res = GenreService.createGenre(data, access_token);
    return res;
  });

  const { data: dataCreateGenre, isSuccess: isSuccessCreateGenre } =
    mutationCreate;

  const {
    data: dataUpdateGenre,
    isSuccess: isSuccessUpdateGenre,
    isLoading: isLoadingUpdateGenre,
  } = mutationUpdate;

  const {
    data: dataDeleteGenre,
    isSuccess: isSuccessDeleteGenre,
    isLoading: isLoadingDeleteGenre,
  } = mutationDelete;

  const { data: dataDeleteManyGenre, isSuccess: isSuccessDeleteManyGenre } =
    mutationDeleteMany;

  const getGenreAdmin = async () => {
    setIsLoadingGenre(true);
    const res = await GenreService.getGenreAdmin(pageValue, 10);
    setDataGenreAdmin(res?.data);
    setTotalGenre(res?.totalGenre);
    setIsLoadingGenre(false);
  };

  useEffect(() => {
    getGenreAdmin();
  }, [
    pageValue,
    isSuccessCreateGenre,
    isSuccessUpdateGenre,
    isSuccessDeleteGenre,
    isSuccessDeleteManyGenre,
  ]);

  const dataGenreTable = dataGenreAdmin.map((genre) => {
    return { ...genre, key: genre._id };
  });

  useEffect(() => {
    if (isSuccessCreateGenre && dataCreateGenre?.status === "OK") {
      Message.success("Tạo thể loại mới thành công!");
      setStateGenre({
        name: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    } else if (dataCreateGenre?.status === "ERROR") {
      Message.error("Tạo thể loại mới thất bại!");
      setStateGenre({
        name: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateGenre]);

  useEffect(() => {
    if (isSuccessUpdateGenre && dataUpdateGenre?.status === "OK") {
      Message.success("Cập nhật thông tin thể loại thành công!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateGenre?.status === "ERROR") {
      Message.error("Cập nhật thông tin thể loại thất bại!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateGenre]);

  useEffect(() => {
    if (isSuccessDeleteGenre && dataDeleteGenre?.status === "OK") {
      Message.success("Xóa thể loại thành công!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteGenre?.status === "ERROR") {
      Message.success("Xóa thể loại thất bại!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteGenre]);

  useEffect(() => {
    if (isSuccessDeleteManyGenre && dataDeleteManyGenre?.status === "OK") {
      Message.success("Xóa nhiều thể loại thành công!");
    } else if (dataDeleteGenre?.status === "ERROR") {
      Message.success("Xóa nhiều thể loại thất bại!");
    }
  }, [isSuccessDeleteManyGenre]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    formCreate.resetFields();
    setIsOpenModalCreate(false);
  };

  const newStateGenre = {
    name: stateGenre.name,
  };

  const handleCreateGenre = () => {
    mutationCreate.mutate({
      data: newStateGenre,
      access_token: user?.access_token,
    });
  };

  const handleOnChange = (e) => {
    setStateGenre({
      ...stateGenre,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailGenre({
      ...stateDetailGenre,
      [e.target.name]: e.target.value,
    });
  };

  const fetchGetDetailGenre = async () => {
    const res = await GenreService.getDetailGenre(isRowSelected);

    if (res?.data) {
      setStateDetailGenre({
        name: res?.data?.name,
      });
    }
    return res;
  };

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailGenre();
    }
  }, [isRowSelected]);

  useEffect(() => {
    if (isOpenModalEdit) {
      formUpdate.setFieldsValue(stateDetailGenre);
    } else {
      formUpdate.resetFields();
    }
  }, [formUpdate, stateDetailGenre, isOpenModalEdit]);

  const handleGetDetailPublisher = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateGenre = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateDetailGenre,
    });
  };

  const handleDeleteGenre = () => {
    mutationDelete.mutate({
      id: isRowSelected,
      access_token: user?.access_token,
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
          onClick={handleGetDetailPublisher}
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
      title: "Mã thể loại",
      dataIndex: "_id",
    },
    {
      title: "Tên thể loại",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyPublisher = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token });
  };

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  return (
    <div>
      <WrapperHeader>Quản lý thể loại</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo thể loại mới"
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
          onFinish={handleCreateGenre}
          autoComplete="off"
          form={formCreate}
        >
          <Form.Item
            label="Tên thể loại"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên thể loại!",
              },
            ]}
          >
            <InputComponent
              value={stateGenre.name}
              onChange={handleOnChange}
              name="name"
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
        title="Xóa thể loại"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDeleteGenre}
      >
        <LoadingComponent isLoading={isLoadingDeleteGenre}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa thể loại có tên "${isNameGenre}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        title="Chi tiết thể loại"
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateGenre}>
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
            onFinish={handleUpdateGenre}
            autoComplete="off"
            form={formUpdate}
          >
            <Form.Item
              label="Tên thể loại"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên thể loại!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailGenre.name}
                onChange={handleOnChangeDetail}
                name="name"
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
          isLoading={isLoadingGenre}
          columns={columns}
          data={dataGenreTable}
          pageValue={pageValue}
          totalPagination={totalGenre}
          handleDelete={handleDeleteManyPublisher}
          handleOnChangePage={handleOnChangePage}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameGenre(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AdminGenre;
