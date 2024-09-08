import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Button, Form, Select, Space } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as AuthorService from "../../services/AuthorService";
import * as GenreService from "../../services/GenreService";
import * as ProductService from "../../services/ProductService";
import * as PublisherService from "../../services/PublisherService";
import { getBase64 } from "../../utils/utils";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperButton, WrapperHeader, WrapperUpload } from "./styles";

const AdminProduct = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [publisher, setPublisher] = useState([]);
  const [genre, setGenre] = useState([]);
  const [author, setAuthor] = useState([]);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [isNameProduct, setIsNameProduct] = useState("");
  const [typeProduct, setTypeProduct] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [dataProductAdmin, setDataProductAdmin] = useState([]);
  const [totalProduct, setTotalProduct] = useState(10);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

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

  const initialStateProduct = () => {
    return {
      name: "",
      image: "",
      price: "",
      countInStock: "",
      discount: "",
      description: "",
      pageCount: "",
      format: "",
      weight: "",
      authorId: "",
      genreId: "",
      publisherId: "",
    };
  };

  const initialStateDetailProduct = () => {
    return {
      name: "",
      image: "",
      price: "",
      countInStock: "",
      discount: "",
      description: "",
      pageCount: "",
      format: "",
      weight: "",
      authorId: "",
      genreId: "",
      publisherId: "",
    };
  };

  const [stateProduct, setStateProduct] = useState(initialStateProduct());
  const [stateDetailProduct, setStateDetailProduct] = useState(
    initialStateDetailProduct()
  );

  const [formCreate] = Form.useForm();
  const [formUpdate] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = ProductService.updateProduct(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = ProductService.deleteProduct(id, access_token);
    return res;
  });

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = ProductService.deleteManyProduct(ids, access_token);
    return res;
  });

  const mutationCreate = useMutationHook((data) => {
    const res = ProductService.createProduct(data);
    return res;
  });

  const { data: dataCreateProduct, isSuccess: isSuccessCreateProduct } =
    mutationCreate;

  const {
    data: dataUpdateProduct,
    isSuccess: isSuccessUpdateProduct,
    isLoading: isLoadingUpdateProduct,
  } = mutationUpdate;

  const {
    data: dataDeleteProduct,
    isSuccess: isSuccessDeleteProduct,
    isLoading: isLoadingDeleteProduct,
  } = mutationDelete;

  const { data: dataDeleteManyProduct, isSuccess: isSuccessDeleteManyProduct } =
    mutationDeleteMany;

  const getProductAdmin = async () => {
    setIsLoadingProduct(true);
    const res = await ProductService.getProductAdmin(pageValue, 10);
    setDataProductAdmin(res?.data);
    setTotalProduct(res?.totalProduct);
    setIsLoadingProduct(false);
  };

  useEffect(() => {
    getProductAdmin();
  }, [
    pageValue,
    isSuccessCreateProduct,
    isSuccessUpdateProduct,
    isSuccessDeleteProduct,
  ]);

  const dataProductTable = dataProductAdmin.map((product) => {
    return { ...product, key: product._id };
  });

  useEffect(() => {
    if (isSuccessCreateProduct && dataCreateProduct?.status === "OK") {
      Message.success("Tạo sản phẩm mới thành công!");
      setStateProduct({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        image: "",
        pageCount: "",
        format: "",
        description: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    } else if (dataCreateProduct?.status === "ERROR") {
      Message.error("Tạo sản phẩm mới thất bại!");
      setStateProduct({
        name: "",
        type: "",
        price: "",
        countInStock: "",
        rating: "",
        image: "",
        pageCount: "",
        format: "",
        description: "",
      });
      formCreate.resetFields();
      setIsOpenModalCreate(false);
    }
  }, [isSuccessCreateProduct]);

  useEffect(() => {
    if (isSuccessUpdateProduct && dataUpdateProduct?.status === "OK") {
      Message.success("Cập nhật thông tin sản phẩm thành công!");
      setIsOpenModalEdit(false);
    } else if (dataUpdateProduct?.status === "ERROR") {
      Message.error("Cập nhật thông tin sản phẩm thất bại!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateProduct]);

  useEffect(() => {
    if (isSuccessDeleteProduct && dataDeleteProduct?.status === "OK") {
      Message.success("Xóa sản phẩm thành công!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteProduct?.status === "ERROR") {
      Message.success("Xóa sản phẩm thất bại!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteProduct]);

  useEffect(() => {
    if (isSuccessDeleteManyProduct && dataDeleteManyProduct?.status === "OK") {
      Message.success("Xóa nhiều sản phẩm thành công!");
    } else if (dataDeleteProduct?.status === "ERROR") {
      Message.success("Xóa nhiều sản phẩm thất bại!");
    }
  }, [isSuccessDeleteManyProduct]);

  const showModal = () => {
    setIsOpenModalCreate(true);
  };

  const handleCancelModalCreate = () => {
    formCreate.resetFields();
    setIsOpenModalCreate(false);
  };

  const newStateProduct = {
    name: stateProduct.name,
    image: stateProduct.image,
    price: stateProduct.price,
    countInStock: stateProduct.countInStock,
    discount: stateProduct.discount,
    description: stateProduct.description,
    pageCount: stateProduct.pageCount,
    format: stateProduct.format,
    weight: stateProduct.weight,
    authorId: stateProduct.authorId,
    genreId: stateProduct.genreId,
    publisherId: stateProduct.publisherId,
  };

  const handleCreateProduct = async () => {
    await mutationCreate.mutate(newStateProduct);
  };

  const handleOnChange = (e) => {
    setStateProduct({
      ...stateProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateProduct({
      ...stateProduct,
      image: file.preview,
    });
  };

  const handleOnChangeDetail = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0];

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    setStateDetailProduct({
      ...stateDetailProduct,
      image: file.preview,
    });
  };

  useEffect(() => {
    const fetchDetailProduct = async () => {
      const res = await ProductService.getDetailProduct(isRowSelected);
      setStateDetailProduct({
        name: res?.data?.name,
        image: res?.data?.image,
        price: res?.data?.price,
        countInStock: res?.data?.countInStock,
        rating: res?.data?.rating,
        discount: res?.data?.discount,
        description: res?.data?.description,
        pageCount: res?.data?.pageCount,
        format: res?.data?.format,
        weight: res?.data?.weight,
        publisherId: res?.data?.publisherId,
        genreId: res?.data?.genreId,
        authorId: res?.data?.authorId,
      });
    };

    if (isRowSelected) {
      fetchDetailProduct();
    }
  }, [isRowSelected]);

  useEffect(() => {
    if (isOpenModalEdit) {
      formUpdate.setFieldsValue(stateDetailProduct);
    } else {
      formUpdate.resetFields();
    }
  }, [formUpdate, stateDetailProduct, isOpenModalEdit]);

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateProduct = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateDetailProduct,
      access_token: user?.access_token,
    });
  };

  const handleDelete = () => {
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
          onClick={handleGetDetailProduct}
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
      title: "Tên sách",
      dataIndex: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps("name"),
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
      title: "Số trang",
      dataIndex: "pageCount",
    },
    {
      title: "Định dạng",
      dataIndex: "format",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
      sorter: (a, b) => a.price - b.price,
      filters: [
        {
          text: ">= 50000",
          value: ">=",
        },
        {
          text: "< 50000",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.price >= 50000;
        }
        return record?.price < 50000;
      },
    },
    {
      title: "% Giảm giá",
      dataIndex: "discount",
      sorter: (a, b) => a.discount - b.discount,
      filters: [
        {
          text: ">= 10",
          value: ">=",
        },
        {
          text: "< 10",
          value: "<",
        },
      ],
      onFilter: (value, record) => {
        if (value === ">=") {
          return record?.discount >= 10;
        }
        return record?.discount < 10;
      },
    },
    {
      title: "Trọng lượng",
      dataIndex: "weight",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyProduct = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token });
  };

  useEffect(() => {
    const fetchAllTypeProduct = async () => {
      const res = await ProductService.getAllType();
      if (res?.status === "OK") {
        setTypeProduct(res?.data);
      }
      return res.data;
    };

    fetchAllTypeProduct();
  }, [stateProduct]);

  const handleOnChangePublisher = (e) => {
    setStateProduct({
      ...stateProduct,
      publisherId: e,
    });
  };

  const handleOnChangeGenre = (e) => {
    setStateProduct({
      ...stateProduct,
      genreId: e,
    });
  };

  const handleOnChangeAuthor = (e) => {
    setStateProduct({
      ...stateProduct,
      authorId: e,
    });
  };

  const handleOnChangeFormat = (value) => {
    setStateProduct({
      ...stateProduct,
      format: value,
    });
  };

  const handleOnChangeDetailFormat = (value) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      format: value,
    });
  };

  const handleOnChangeDetailPublisher = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      publisherId: e,
    });
  };

  const handleOnChangeDetailGenre = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      genreId: e,
    });
  };

  const handleOnChangeDetailAuthor = (e) => {
    setStateDetailProduct({
      ...stateDetailProduct,
      authorId: e,
    });
  };

  const fetchAllPublisher = async () => {
    const res = await PublisherService.getAllPublisher();
    if (res?.status === "OK") {
      setPublisher(res?.data);
    }
  };

  const fetchAllGenre = async () => {
    const res = await GenreService.getAllGenre();
    if (res?.status === "OK") {
      setGenre(res?.data);
    }
  };

  const fetchAllAuthor = async () => {
    const res = await AuthorService.getAllAuthor();
    if (res?.status === "OK") {
      setAuthor(res?.data);
    }
  };

  useEffect(() => {
    fetchAllAuthor();
    fetchAllGenre();
    fetchAllPublisher();
  }, []);

  const renderPublisher = () => {
    let result = publisher?.map((item, index) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return result;
  };

  const renderGenre = () => {
    let result = genre?.map((item, index) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return result;
  };

  const renderAuthor = () => {
    let result = author?.map((item, index) => {
      return {
        value: item._id,
        label: item.name,
      };
    });
    return result;
  };

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  return (
    <div>
      <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
      <WrapperButton type="dashed" onClick={showModal}>
        Thêm <PlusOutlined />
      </WrapperButton>

      <ModalComponent
        title="Tạo sản phẩm mới"
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
          onFinish={handleCreateProduct}
          autoComplete="off"
          form={formCreate}
        >
          <Form.Item
            label="Tên sách"
            name="name"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập tên sách!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.name}
              onChange={handleOnChange}
              name="name"
            />
          </Form.Item>

          <Form.Item
            label="Tác giả"
            name="authorId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn tác giả!",
              },
            ]}
          >
            <Select
              name="author"
              value={stateProduct.authorId}
              onChange={handleOnChangeAuthor}
              style={{
                width: "100%",
              }}
              options={renderAuthor()}
            />
          </Form.Item>

          <Form.Item
            label="Số trang"
            name="pageCount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số trang!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.pageCount}
              onChange={handleOnChange}
              name="pageCount"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Trọng lượng"
            name="weight"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập trọng lượng!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.weight}
              onChange={handleOnChange}
              name="weight"
              type="string"
            />
          </Form.Item>

          <Form.Item
            label="Định dạng"
            name="format"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập định dạng sách!",
              },
            ]}
          >
            <Select
              onChange={handleOnChangeFormat}
              style={{
                width: "100%",
              }}
              options={[
                { value: "Bìa mềm", label: "Bìa mềm" },
                { value: "Bìa cứng", label: "Bìa cứng" },
              ]}
            />
          </Form.Item>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập mô tả!",
              },
            ]}
          >
            <TextArea
              rows={4}
              name="description"
              value={stateProduct.description}
              onChange={handleOnChange}
            />
          </Form.Item>

          <Form.Item
            label="Nhà xuất bản"
            name="publisherId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn nhà xuất bản!",
              },
            ]}
          >
            <Select
              name="publisherId"
              value={stateProduct.publisherId}
              onChange={handleOnChangePublisher}
              style={{
                width: "100%",
              }}
              options={renderPublisher()}
            />
          </Form.Item>

          <Form.Item
            label="Thể loại"
            name="genreId"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn thể loại!",
              },
            ]}
          >
            <Select
              name="genre"
              value={stateProduct.genreId}
              onChange={handleOnChangeGenre}
              style={{
                width: "100%",
              }}
              options={renderGenre()}
            />
          </Form.Item>

          <Form.Item
            label="Giá tiền"
            name="price"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập giá tiền!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.price}
              onChange={handleOnChange}
              name="price"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Số lượng trong kho"
            name="countInStock"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập số lượng trong kho!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.countInStock}
              onChange={handleOnChange}
              name="countInStock"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="% Giảm giá"
            name="discount"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập % giảm giá!",
              },
            ]}
          >
            <InputComponent
              value={stateProduct.discount}
              onChange={handleOnChange}
              name="discount"
              type="number"
            />
          </Form.Item>

          <Form.Item
            label="Hình ảnh"
            name="image"
            rules={[
              {
                required: true,
                message: "Vui lòng chọn hình ảnh!",
              },
            ]}
          >
            <WrapperUpload onChange={handleOnChangeAvatar} maxCount={1}>
              <Button className={stateProduct.image ? "btn-upload" : null}>
                Upload
              </Button>
              {stateProduct.image && (
                <img
                  src={stateProduct.image}
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
        title="Xóa sản phẩm"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDelete}
      >
        <LoadingComponent isLoading={isLoadingDeleteProduct}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa sản phẩm có tên "${isNameProduct}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        open={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateProduct}>
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
            onFinish={handleUpdateProduct}
            autoComplete="off"
            form={formUpdate}
          >
            <Form.Item
              label="Tên sách"
              name="name"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên sách!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.name}
                onChange={handleOnChangeDetail}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Tác giả"
              name="authorId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn tác giả!",
                },
              ]}
            >
              <Select
                name="authorId"
                value={stateDetailProduct.authorId}
                onChange={handleOnChangeDetailAuthor}
                style={{
                  width: "100%",
                }}
                options={renderAuthor()}
              />
            </Form.Item>

            <Form.Item
              label="Số trang"
              name="pageCount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số trang!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.pageCount}
                onChange={handleOnChangeDetail}
                name="pageCount"
              />
            </Form.Item>

            <Form.Item
              label="Định dạng"
              name="format"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập định dạng sách!",
                },
              ]}
            >
              <Select
                onChange={handleOnChangeDetailFormat}
                style={{
                  width: "100%",
                }}
                options={[
                  { value: "Bìa mềm", label: "Bìa mềm" },
                  { value: "Bìa cứng", label: "Bìa cứng" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Trọng lượng"
              name="weight"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trọng lượng!",
                },
              ]}
            >
              <InputComponent
                value={stateDetailProduct.weight}
                onChange={handleOnChangeDetail}
                name="weight"
              />
            </Form.Item>

            <Form.Item
              label="Mô tả"
              name="description"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mô tả!",
                },
              ]}
            >
              <TextArea
                rows={4}
                name="description"
                value={stateDetailProduct.description}
                onChange={handleOnChangeDetail}
              />
            </Form.Item>

            <Form.Item
              label="Nhà xuất bản"
              name="publisherId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn nhà xuất bản!",
                },
              ]}
            >
              <Select
                name="publisherId"
                value={stateDetailProduct.publisherId}
                onChange={handleOnChangeDetailPublisher}
                style={{
                  width: "100%",
                }}
                options={renderPublisher()}
              />
            </Form.Item>

            <Form.Item
              label="Thể loại"
              name="genreId"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn thể loại!",
                },
              ]}
            >
              <Select
                name="genreId"
                value={stateDetailProduct.genreId}
                onChange={handleOnChangeDetailGenre}
                style={{
                  width: "100%",
                }}
                options={renderGenre()}
              />
            </Form.Item>

            <Form.Item
              label="Giá tiền"
              name="price"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập giá tiền!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.price}
                onChange={handleOnChangeDetail}
                name="price"
              />
            </Form.Item>

            <Form.Item
              label="Số lượng trong kho"
              name="countInStock"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số lượng trong kho!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.countInStock}
                onChange={handleOnChangeDetail}
                name="countInStock"
              />
            </Form.Item>

            <Form.Item
              label="% Giảm giá"
              name="discount"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập % giảm giá!",
                },
              ]}
            >
              <InputComponent
                type="number"
                value={stateDetailProduct.discount}
                onChange={handleOnChangeDetail}
                name="discount"
              />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="image"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn hình ảnh!",
                },
              ]}
            >
              <WrapperUpload onChange={handleOnChangeAvatarDetail} maxCount={1}>
                <Button
                  className={stateDetailProduct.image ? "btn-upload" : null}
                >
                  Upload
                </Button>
                {stateDetailProduct.image && (
                  <img
                    src={stateDetailProduct.image}
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
          isLoading={isLoadingProduct}
          columns={columns}
          data={dataProductTable}
          pageValue={pageValue}
          totalPagination={totalProduct}
          handleDelete={handleDeleteManyProduct}
          handleOnChangePage={handleOnChangePage}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id);
                setIsNameProduct(record.name);
              },
            };
          }}
        />
      </div>
    </div>
  );
};

export default AdminProduct;
