import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Button, Form, Modal, Select, Space } from "antd";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import * as Message from "../../components/Message/Message";
import useMutationHook from "../../hooks/useMutationHook";
import * as OrderService from "../../services/OrderService";
import { convertPrice } from "../../utils/utils";
import DrawerComponent from "../DrawerComponent/DrawerComponent";
import InputComponent from "../InputComponent/InputComponent";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ModalComponent from "../ModalComponent/ModalComponent";
import TableComponent from "../TableComponent/TableComponent";
import { WrapperHeader } from "./styles";

const AdminOrder = () => {
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false);
  const [isRowSelected, setIsRowSelected] = useState("");
  const [typeBoolean, setTypeBoolean] = useState(["true", "false"]);
  const [typeDelivery, setTypeDelivery] = useState([
    "Chờ giao hàng",
    "Đang giao hàng",
    "Đã giao hàng",
  ]);
  const [isCodeOrder, setIsCodeOrder] = useState("");
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [dataOrderAdmin, setDataOrderAdmin] = useState([]);
  const [totalOrder, setTotalOrder] = useState(10);
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

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

  const [stateOrderDetail, setStateOrderDetail] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    deliveryMethod: "",
    isPaided: false,
    isDelivered: "",
  });

  const stateOrderDetailPut = {
    shippingAddress: {
      fullName: stateOrderDetail.fullName,
      phone: stateOrderDetail.phone,
      address: stateOrderDetail.address,
      city: stateOrderDetail.city,
    },
    deliveryMethod: stateOrderDetail.deliveryMethod,
    isPaid: stateOrderDetail.isPaided,
    isDelivered: stateOrderDetail.isDelivered,
  };

  const [form] = Form.useForm();

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = OrderService.updateOrder(id, data, access_token);
    return res;
  });

  const mutationDelete = useMutationHook(
    ({ id, access_token, orderItems, email }) => {
      const res = OrderService.deleteOrder(id, access_token, orderItems, email);
      return res;
    }
  );

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = OrderService.deleteManyOrder(ids, access_token);
    return res;
  });

  const {
    data: dataUpdateOrder,
    isError: isErrorUpdateOrder,
    isSuccess: isSuccessUpdateOrder,
    isLoading: isLoadingUpdateOrder,
  } = mutationUpdate;

  const {
    data: dataDeleteOrder,
    isSuccess: isSuccessDeleteOrder,
    isLoading: isLoadingDeleteOrder,
  } = mutationDelete;

  const {
    data: dataDeleteManyOrder,
    isSuccess: isSuccessDeleteManyOrder,
    isLoading: isLoadingDeleteManyOrder,
  } = mutationDeleteMany;

  const getAll = async () => {
    const res = await OrderService.getAllOrder(user?.access_token);
    return res;
  };

  const getOrderAdmin = async () => {
    setIsLoadingOrder(true);
    const res = await OrderService.getOrderAdmin(
      user?.access_token,
      pageValue,
      10
    );
    setDataOrderAdmin(res?.data);
    setTotalOrder(res?.totalOrder);
    setIsLoadingOrder(false);
  };

  useEffect(() => {
    getOrderAdmin();
  }, [
    pageValue,
    isSuccessUpdateOrder,
    isSuccessDeleteOrder,
    isSuccessDeleteManyOrder,
  ]);

  const queryGetAllOrder = useQuery({
    queryKey: ["orders"],
    queryFn: getAll,
  });

  const { data: orders } = queryGetAllOrder;

  const dataOrder = dataOrderAdmin
    ?.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    ?.map((order) => {
      return {
        ...order,
        key: order._id,
        codeOrder: `DH${order._id}`,
        userName: order.shippingAddress.fullName,
        phone: order.shippingAddress.phone,
        address: order.shippingAddress.address,
        city: order.shippingAddress.city,
        isPaid: order.isPaid ? "Đã thanh toán" : "Chưa thanh toán",
        isDelivered: order.isDelivered,
        orderItems: order.orderItems,
        totalPrice: convertPrice(order.totalPrice),
        paymentMethod: order.paymentMethod,
        orderItemsLength: order.orderItems.length,
        deliveryMethod: order.deliveryMethod,
      };
    });

  useEffect(() => {
    if (isSuccessUpdateOrder && dataUpdateOrder?.status === "OK") {
      Message.success("Cập nhật thông tin đơn hàng thành công!");
      setIsOpenModalEdit(false);
    }
    if (isErrorUpdateOrder) {
      Message.error("Cập nhật thông tin đơn hàng thất bại!");
      setIsOpenModalEdit(false);
    }
  }, [isSuccessUpdateOrder]);

  useEffect(() => {
    if (isSuccessDeleteOrder && dataDeleteOrder?.status === "OK") {
      Message.success("Xóa đơn hàng thành công!");
      setIsOpenModalDelete(false);
    } else if (dataDeleteOrder?.status === "ERROR") {
      Message.success("Xóa đơn hàng thất bại!");
      setIsOpenModalDelete(false);
    }
  }, [isSuccessDeleteOrder]);

  useEffect(() => {
    if (isSuccessDeleteManyOrder && dataDeleteManyOrder?.status === "OK") {
      Message.success("Xóa nhiều đơn hàng thành công!");
    } else if (dataDeleteManyOrder?.status === "ERROR") {
      Message.success("Xóa nhiều đơn hàng thất bại!");
    }
  }, [isSuccessDeleteManyOrder]);

  const handleOnChangeDetail = (e) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      [e.target.name]: e.target.value,
    });
  };

  const handleOnChangeDetailDeliveryMethod = (value) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      deliveryMethod: value,
    });
  };

  useEffect(() => {
    const fetchDetailOrder = async () => {
      const res = await OrderService.getOrderDetail(
        isRowSelected,
        user?.access_token
      );

      if (res?.data) {
        setStateOrderDetail({
          fullName: res?.data?.shippingAddress?.fullName,
          phone: res?.data?.shippingAddress?.phone,
          address: res?.data?.shippingAddress?.address,
          city: res?.data?.shippingAddress?.city,
          deliveryMethod: res?.data?.deliveryMethod,
          isPaided: String(res?.data?.isPaid),
          isDelivered: String(res?.data?.isDelivered),
        });
      }
      return res;
    };

    if (isRowSelected) {
      fetchDetailOrder();
    }
  }, [isRowSelected]);

  useEffect(() => {
    form.setFieldsValue(stateOrderDetail);
  }, [form, stateOrderDetail]);

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true);
  };

  const handleUpdateOrder = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateOrderDetailPut,
      access_token: user?.access_token,
    });
  };

  const orderFind = dataOrder?.find((item) => isRowSelected === item.key);

  const handleDelete = () => {
    mutationDelete.mutate({
      id: isRowSelected,
      access_token: user?.access_token,
      orderItems: orderFind?.orderItems,
      email: orderFind?.shippingAddress?.email,
    });
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
  const [modalContent, setModalContent] = useState({});
  const [isShowModal, setIsShowModal] = useState(false);
  const handleChangeStatus = async (id, newStatus) => {
    const order = await OrderService.getOrderDetail(id, user?.access_token);
    if (newStatus == "Đang giao hàng") {
      setModalContent({
        footer: (
          <div>
            <button
              className="py-1 px-3 rounded bg-gray-700 text-white mr-2"
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              Hủy
            </button>
            <button
              className="py-1 px-3 rounded bg-green-700 text-white"
              onClick={async () => {
                order.isDelivered = newStatus;
                const result = await OrderService.updateOrder(
                  id,
                  order,
                  user?.access_token
                );
                console.log(result);
                getOrderAdmin();
                setIsShowModal(false);
              }}
            >
              Đồng ý
            </button>
          </div>
        ),
        content: (
          <>
            <div>Xác nhận bắt đầu giao hàng cho đơn hàng sau</div>
            <div>
              Đơn hàng số:{" "}
              <span className="text-red-900 font-semibold">{id}</span>
            </div>
          </>
        ),
        title: "Xác nhận bắt đầu giao hàng",
      });
    } else if (newStatus == "Đã giao hàng") {
      setModalContent({
        footer: (
          <div>
            <button
              className="py-1 px-3 rounded bg-gray-700 text-white mr-2"
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              Hủy
            </button>
            <button
              className="py-1 px-3 rounded bg-green-700 text-white"
              onClick={async () => {
                order.isDelivered = newStatus;
                order.isPaid = true;
                const result = await OrderService.updateOrder(
                  id,
                  order,
                  user?.access_token
                );
                console.log(result);
                getOrderAdmin();
                setIsShowModal(false);
              }}
            >
              Đồng ý
            </button>
          </div>
        ),
        content: (
          <>
            <div>Xác nhận giao hàng thành công cho đơn hàng sau</div>
            <div>
              Đơn hàng số:{" "}
              <span className="text-red-900 font-semibold">{id}</span>
            </div>
            {!order.data.isPaid ? (
              <div className="flex align-center justify-center">
                <div className="w-8 mr-2">
                  <span className="text-yellow-700 text-[32px]">
                    <i className="fa-solid fa-triangle-exclamation"></i>
                  </span>
                </div>
                <div className="flex-1">
                  Đơn thanh toán khi nhận hàng, xác nhận khách hàng đã thanh
                  toán trước khi xác nhận.
                </div>
              </div>
            ) : (
              ""
            )}
          </>
        ),
        title: "Xác nhận giao hàng thành công",
      });
    } else if (newStatus == "Giao hàng không thành công") {
      setModalContent({
        footer: (
          <div>
            <button
              className="py-1 px-3 rounded bg-gray-700 text-white mr-2"
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              Hủy
            </button>
            <button
              className="py-1 px-3 rounded bg-green-700 text-white"
              onClick={async () => {
                order.isDelivered = newStatus;
                const result = await OrderService.updateOrder(
                  id,
                  order,
                  user?.access_token
                );
                getOrderAdmin();
                setIsShowModal(false);
              }}
            >
              Đồng ý
            </button>
          </div>
        ),
        content: (
          <>
            <div>Xác nhận giao hàng không thành công cho đơn hàng sau</div>
            <div>
              Đơn hàng số:{" "}
              <span className="text-red-900 font-semibold">{id}</span>
            </div>
          </>
        ),
        title: "Xác nhận giao hàng không thành công",
      });
    } else if (newStatus == "Đã hủy") {
      setModalContent({
        footer: (
          <div>
            <button
              className="py-1 px-3 rounded bg-gray-700 text-white mr-2"
              onClick={() => {
                setIsShowModal(false);
              }}
            >
              Hủy
            </button>
            <button
              className="py-1 px-3 rounded bg-green-700 text-white"
              onClick={async () => {
                const result = await OrderService.deleteOrder(
                  id,
                  user?.access_token,
                  order.data.orderItems,
                  order.data.email
                );
                getOrderAdmin();
                setIsShowModal(false);
              }}
            >
              Đồng ý
            </button>
          </div>
        ),
        content: (
          <>
            <div>Xác nhận hủy đơn hàng sau</div>
            <div>
              Đơn hàng số:{" "}
              <span className="text-red-900 font-semibold">{id}</span>
            </div>
          </>
        ),
        title: "Xác nhận hủy đơn hàng",
      });
    }
    setIsShowModal(true);
  };
  const renderIcons = (text, record, index) => {
    const changeStatusButtons = {
      "Chờ giao hàng": (
        <div className="w-max">
          <button
            className="w-8 h-8 mr-1 rounded border-blue-500 border-2 font-semibold text-blue-500"
            title="Giao hàng"
            onClick={() => {
              handleChangeStatus(record._id, "Đang giao hàng");
            }}
          >
            <i className="fa-solid fa-truck"></i>
          </button>
          <button
            className="w-8 h-8 mr-1 rounded border-red-500 border-2 font-semibold text-red-500"
            title="Hủy đơn hàng"
            onClick={() => {
              handleChangeStatus(record._id, "Đã hủy");
            }}
          >
            <i className="fa-solid fa-ban"></i>
          </button>
        </div>
      ),
      "Đang giao hàng": (
        <div className="w-max">
          <button
            className="w-8 h-8 mr-1 rounded border-green-500 border-2 font-semibold text-green-500"
            title="Giao hàng thành công"
            onClick={() => {
              handleChangeStatus(record._id, "Đã giao hàng");
            }}
          >
            <i className="fa-solid fa-check"></i>
          </button>
          <button
            className="w-8 h-8 mr-1 rounded border-yellow-500 border-2 font-semibold text-yellow-500"
            title="Giao hàng không thành công"
            onClick={() => {
              handleChangeStatus(record._id, "Giao hàng không thành công");
            }}
          >
            <i class="fa-solid fa-circle-exclamation"></i>
          </button>
          <button
            className="w-8 h-8 mr-1 rounded border-red-500 border-2 font-semibold text-red-500"
            title="Hủy đơn hàng"
            onClick={() => {
              handleChangeStatus(record._id, "Đã hủy");
            }}
          >
            <i className="fa-solid fa-ban"></i>
          </button>
        </div>
      ),
      "Đã giao hàng": <></>,
      "Đã hủy": <></>,
      "Giao hàng không thành công": (
        <div className="w-max">
          <button
            className="w-8 h-8 mr-1 rounded border-gray-500 border-2 font-semibold text-gray-500"
            title="Giao lại"
            onClick={() => {
              handleChangeStatus(record._id, "Chờ giao hàng");
            }}
          >
            <i className="fa-solid fa-rotate-right"></i>
          </button>
          <button
            className="w-8 h-8 mr-1 rounded border-red-500 border-2 font-semibold text-red-500"
            title="Hủy đơn hàng"
            onClick={() => {
              handleChangeStatus(record._id, "Đã hủy");
            }}
          >
            <i className="fa-solid fa-ban"></i>
          </button>
        </div>
      ),
    };
    return (
      <div>{changeStatusButtons[record["isDelivered"]]}</div>
      // <div>
      //   <DeleteOutlined
      //     style={{
      //       fontSize: "26px",
      //       color: "red",
      //       cursor: "pointer",
      //       marginRight: "10px",
      //     }}
      //     onClick={() => setIsOpenModalDelete(true)}
      //   />
      //   <EditOutlined
      //     style={{ fontSize: "26px", color: "orange", cursor: "pointer" }}
      //     onClick={handleGetDetailProduct}
      //   />
      // </div>
    );
  };

  const columns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "codeOrder",
      ...getColumnSearchProps("_id"),
    },
    {
      title: "Tên người đặt",
      dataIndex: "userName",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Thành phố",
      dataIndex: "city",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "isPaid",
    },
    {
      title: "Trạng thái giao hàng",
      dataIndex: "isDelivered",
    },
    {
      title: "Phương thức thanh toán",
      dataIndex: "paymentMethod",
    },
    {
      title: "Phương thức giao hàng",
      dataIndex: "deliveryMethod",
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
    },
    {
      title: "Hành động",
      dataIndex: "action",
      render: renderIcons,
    },
  ];

  const handleDeleteManyOrder = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token });
  };

  const handleOnChangeDelivered = (e) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      isDelivered: e,
    });
  };

  const handleOnChangePaided = (e) => {
    setStateOrderDetail({
      ...stateOrderDetail,
      isPaided: e,
    });
  };

  const renderTypeBoolean = () => {
    let result = typeBoolean.map((type) => {
      return {
        value: type,
        label: type,
      };
    });
    return result;
  };

  const renderTypeDelivery = () => {
    let result = typeDelivery.map((type) => {
      return {
        value: type,
        label: type,
      };
    });
    return result;
  };

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page);
  };

  return (
    <div>
      <WrapperHeader>Quản lý đơn hàng</WrapperHeader>

      <ModalComponent
        title="Xóa đơn hàng"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDelete}
      >
        <LoadingComponent isLoading={isLoadingDeleteOrder}>
          <div
            style={{ marginTop: "12px", fontWeight: 600, height: "50px" }}
          >{`Bạn có chắc chắn muốn xóa đơn hàng có mã "${isCodeOrder}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        title="Thông tin đơn hàng"
        open={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateOrder}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 22,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={handleUpdateOrder}
            autoComplete="off"
            form={form}
          >
            <Form.Item
              label="Tên người đặt"
              name="fullName"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập tên người đặt!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.fullName}
                onChange={handleOnChangeDetail}
                name="fullName"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập số điện thoại!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.phone}
                onChange={handleOnChangeDetail}
                name="phone"
                type="number"
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
                value={stateOrderDetail.address}
                onChange={handleOnChangeDetail}
                name="address"
              />
            </Form.Item>

            <Form.Item
              label="Thành phố"
              name="city"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập thành phố!",
                },
              ]}
            >
              <InputComponent
                value={stateOrderDetail.city}
                onChange={handleOnChangeDetail}
                name="city"
              />
            </Form.Item>

            <Form.Item
              label="Phương thức giao hàng"
              name="deliveryMethod"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập phương thức giao hàng!",
                },
              ]}
            >
              <Select
                onChange={handleOnChangeDetailDeliveryMethod}
                style={{
                  width: "100%",
                }}
                options={[
                  { value: "GHTK", label: "GHTK" },
                  { value: "J&T Express", label: "J&T Express" },
                ]}
              />
            </Form.Item>

            <Form.Item
              label="Trạng thái thanh toán"
              name="isPaided"
              rules={[
                {
                  required: true,
                  message: "Vui lòng chọn trạng thái thanh toán!",
                },
              ]}
            >
              <Select
                name="isPaided"
                value={stateOrderDetail.isPaided}
                onChange={handleOnChangePaided}
                style={{
                  width: "100%",
                }}
                options={renderTypeBoolean()}
              />
            </Form.Item>

            <Form.Item
              label="Trạng thái giao hàng"
              name="isDelivered"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập trạng thái giao hàng!",
                },
              ]}
            >
              <Select
                name="isDelivered"
                value={stateOrderDetail.isDelivered}
                onChange={handleOnChangeDelivered}
                style={{
                  width: "100%",
                }}
                options={renderTypeDelivery()}
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
      <Modal
        open={isShowModal}
        footer={modalContent.footer}
        title={modalContent.title}
        onCancel={() => {
          setIsShowModal(false);
        }}
      >
        {modalContent.content}
      </Modal>

      <div style={{ marginTop: "20px" }}>
        <LoadingComponent isLoading={isLoadingDeleteManyOrder}>
          <TableComponent
            isLoading={isLoadingOrder}
            columns={columns}
            data={dataOrder}
            pageValue={pageValue}
            totalPagination={totalOrder}
            handleDelete={handleDeleteManyOrder}
            handleOnChangePage={handleOnChangePage}
            onRow={(record) => {
              return {
                onClick: (event) => {
                  setIsRowSelected(record._id);
                  setIsCodeOrder(record.codeOrder);
                },
              };
            }}
          />
        </LoadingComponent>
      </div>
    </div>
  );
};

export default AdminOrder;
