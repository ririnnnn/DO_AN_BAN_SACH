import {
  PlusOutlined,
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
} from '@ant-design/icons'
import { Button, Form, Select, Space } from 'antd'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import * as Message from '../../components/Message/Message'
import useMutationHook from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'
import { getBase64 } from '../../utils/utils'
import DrawerComponent from '../DrawerComponent/DrawerComponent'
import InputComponent from '../InputComponent/InputComponent'
import LoadingComponent from '../LoadingComponent/LoadingComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import TableComponent from '../TableComponent/TableComponent'
import { WrapperButton, WrapperHeader, WrapperUpload } from './styles'

const AdminUser = () => {
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false)
  const [isOpenModalEdit, setIsOpenModalEdit] = useState(false)
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false)
  const [isRowSelected, setIsRowSelected] = useState('')
  const [isEmailUser, setIsEmailUser] = useState('')
  const [searchText, setSearchText] = useState('')
  const [typeBoolean, setTypeBoolean] = useState(['true', 'false'])
  const [searchedColumn, setSearchedColumn] = useState('')
  const [pageValue, setPageValue] = useState(1)
  const [dataUserAdmin, setDataUserAdmin] = useState([])
  const [totalUser, setTotalUser] = useState(10)
  const [isLoadingUser, setIsLoadingUser] = useState(false)

  const searchInput = useRef(null)

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = (clearFilters) => {
    clearFilters()
    setSearchText('')
  }

  const user = useSelector((state) => state.user)

  const [stateUserDetail, setStateUserDetail] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    isAdmin: false,
    avatar: '',
  })

  const [stateUser, setStateUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [formCreate] = Form.useForm()
  const [formUpdate] = Form.useForm()

  const mutationCreate = useMutationHook(({ data }) => {
    const res = UserService.signupUser(data)
    return res
  })

  const mutationUpdate = useMutationHook(({ id, data, access_token }) => {
    const res = UserService.updateUser(id, data, access_token)
    return res
  })

  const mutationDelete = useMutationHook(({ id, access_token }) => {
    const res = UserService.deleteUser(id, access_token)
    return res
  })

  const mutationDeleteMany = useMutationHook(({ ids, access_token }) => {
    const res = UserService.deleteManyUser(ids, access_token)
    return res
  })

  const {
    data: dataCreateUser,
    isSuccess: isSuccessCreateUser,
    isLoading: isLoadingCreateUser,
  } = mutationCreate

  const {
    data: dataUpdateUser,
    isSuccess: isSuccessUpdateUser,
    isLoading: isLoadingUpdateUser,
  } = mutationUpdate

  const {
    data: dataDeleteUser,
    isSuccess: isSuccessDeleteUser,
    isLoading: isLoadingDeleteUser,
  } = mutationDelete

  const {
    data: dataDeleteManyUser,
    isSuccess: isSuccessDeleteManyUser,
    isLoading: isLoadingDeleteManyUser,
  } = mutationDeleteMany

  const getUserAdmin = async () => {
    setIsLoadingUser(true)
    const res = await UserService.getUserAdmin(pageValue, 10)
    setDataUserAdmin(res?.data)
    setTotalUser(res?.totalUser)
    setIsLoadingUser(false)
  }

  useEffect(() => {
    getUserAdmin()
  }, [
    pageValue,
    isSuccessCreateUser,
    isSuccessUpdateUser,
    isSuccessDeleteUser,
    isSuccessDeleteManyUser,
  ])

  const dataUserTable = dataUserAdmin.map((user) => {
    return {
      ...user,
      key: user._id,
      isAdmin: user.isAdmin ? 'TRUE' : 'FALSE',
    }
  })

  useEffect(() => {
    if (isSuccessCreateUser && dataCreateUser?.status === 'OK') {
      Message.success('Tạo người dùng mới thành công!')
      formCreate.resetFields()
      setStateUser({
        email: '',
        password: '',
        confirmPassword: '',
      })
      setIsOpenModalCreate(false)
    } else if (dataCreateUser?.status === 'ERROR') {
      Message.error(`${dataCreateUser?.message}`)
      formCreate.resetFields()
      setStateUser({
        email: '',
        password: '',
        confirmPassword: '',
      })
      setIsOpenModalCreate(false)
    }
  }, [isSuccessCreateUser])

  useEffect(() => {
    if (isSuccessUpdateUser && dataUpdateUser?.status === 'OK') {
      Message.success('Cập nhật thông tin người dùng thành công!')
      setIsOpenModalEdit(false)
    } else if (dataUpdateUser?.status === 'ERROR') {
      Message.error('Cập nhật thông tin người dùng thất bại!')
      setIsOpenModalEdit(false)
    }
  }, [isSuccessUpdateUser])

  useEffect(() => {
    if (isSuccessDeleteUser && dataDeleteUser?.status === 'OK') {
      Message.success('Xóa người dùng thành công!')
      setIsOpenModalDelete(false)
    } else if (dataDeleteUser?.status === 'ERROR') {
      Message.success('Xóa người dùng thất bại!')
      setIsOpenModalDelete(false)
    }
  }, [isSuccessDeleteUser])

  useEffect(() => {
    if (isSuccessDeleteManyUser && dataDeleteManyUser?.status === 'OK') {
      Message.success('Xóa nhiều người dùng thành công!')
    } else if (dataDeleteManyUser?.status === 'ERROR') {
      Message.success('Xóa nhiều người dùng thất bại!')
    }
  }, [isSuccessDeleteManyUser])

  const handleCancelModalCreate = () => {
    formCreate.resetFields()
    setIsOpenModalCreate(false)
  }

  const handleOnChangeAvatarDetail = async ({ fileList }) => {
    const file = fileList[0]
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    setStateUserDetail({
      ...stateUserDetail,
      avatar: file.preview,
    })
  }

  const handleOnChange = (e) => {
    setStateUser({
      ...stateUser,
      [e.target.name]: e.target.value,
    })
  }

  console.log(dataCreateUser)

  const handleOnChangeDetail = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      [e.target.name]: e.target.value,
    })
  }

  const fetchGetDetailUser = async () => {
    const res = await UserService.getUserDetail(isRowSelected)
    if (res?.data) {
      setStateUserDetail({
        name: res?.data?.name,
        email: res?.data?.email,
        phone: res?.data?.phone,
        address: res?.data?.address,
        city: res?.data?.city,
        isAdmin: String(res?.data?.isAdmin),
        avatar: res?.data?.avatar,
      })
    }
  }

  useEffect(() => {
    if (isRowSelected) {
      fetchGetDetailUser()
    }
  }, [isRowSelected])

  useEffect(() => {
    formUpdate.setFieldsValue(stateUserDetail)
  }, [formUpdate, stateUserDetail])

  const handleGetDetailProduct = () => {
    setIsOpenModalEdit(true)
  }

  const handleCreateUser = () => {
    mutationCreate.mutate({ data: stateUser })
  }

  const handleUpdateUser = () => {
    mutationUpdate.mutate({
      id: isRowSelected,
      data: stateUserDetail,
      access_token: user?.access_token,
    })
  }

  const handleDelete = () => {
    mutationDelete.mutate({
      id: isRowSelected,
      access_token: user?.access_token,
    })
  }

  const renderIcons = () => {
    return (
      <div>
        <DeleteOutlined
          style={{
            fontSize: '26px',
            color: 'red',
            cursor: 'pointer',
            marginRight: '10px',
          }}
          onClick={() => setIsOpenModalDelete(true)}
        />
        <EditOutlined
          style={{ fontSize: '26px', color: 'orange', cursor: 'pointer' }}
          onClick={handleGetDetailProduct}
        />
      </div>
    )
  }

  const renderTypeBoolean = () => {
    return typeBoolean.map((type) => ({
      label: type,
      value: type,
    }))
  }

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
            display: 'block',
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
              close()
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
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100)
      }
    },
  })

  const columns = [
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      sorter: (a, b) => a?.name?.length - b?.name?.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email?.length - b.email?.length,
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      ...getColumnSearchProps('address'),
    },
    {
      title: 'Thành phố',
      dataIndex: 'city',
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      filters: [
        {
          text: 'True',
          value: true,
        },
        {
          text: 'False',
          value: false,
        },
      ],
      onFilter: (value, record) => {
        if (value === true) {
          return record?.isAdmin === 'TRUE'
        }
        return record?.isAdmin === 'FALSE'
      },
    },
    {
      title: 'Hành động',
      dataIndex: 'action',
      render: renderIcons,
    },
  ]

  const handleDeleteManyUser = (ids) => {
    mutationDeleteMany.mutate({ ids: ids, access_token: user?.access_token })
  }

  const handleOnChangeIsAdmin = (e) => {
    setStateUserDetail({
      ...stateUserDetail,
      isAdmin: e,
    })
  }

  const handleOnChangePage = (page, pageSize) => {
    setPageValue(page)
  }

  return (
    <div>
      <WrapperHeader>Quản lý người dùng</WrapperHeader>

      {/* <WrapperButton type="dashed" onClick={() => setIsOpenModalCreate(true)}>
        Thêm <PlusOutlined />
      </WrapperButton> */}

      {/* <ModalComponent
        title="Tạo người dùng mới"
        open={isOpenModalCreate}
        onCancel={handleCancelModalCreate}
        footer={null}
      >
        <LoadingComponent isLoading={isLoadingCreateUser}>
          <Form
            name="basic"
            labelCol={{
              span: 8,
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
            onFinish={handleCreateUser}
            autoComplete="off"
            form={formCreate}
          >
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
                value={stateUser.email}
                onChange={handleOnChange}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mật khẩu!",
                },
              ]}
            >
              <InputComponent
                value={stateUser.password}
                onChange={handleOnChange}
                name="password"
                type="password"
              />
            </Form.Item>

            <Form.Item
              label="Xác nhận mật khẩu"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập xác nhận mật khẩu!",
                },
              ]}
            >
              <InputComponent
                value={stateUser.confirmPassword}
                onChange={handleOnChange}
                name="confirmPassword"
                type="password"
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
        </LoadingComponent>
      </ModalComponent> */}

      <ModalComponent
        title="Xóa người dùng"
        open={isOpenModalDelete}
        onCancel={() => setIsOpenModalDelete(false)}
        onOk={handleDelete}
      >
        <LoadingComponent isLoading={isLoadingDeleteUser}>
          <div
            style={{ marginTop: '12px', fontWeight: 600, height: '50px' }}
          >{`Bạn có chắc chắn muốn xóa người dùng có email "${isEmailUser}" này không?`}</div>
        </LoadingComponent>
      </ModalComponent>

      <DrawerComponent
        title="Thông tin người dùng"
        open={isOpenModalEdit}
        onClose={() => setIsOpenModalEdit(false)}
        width="50%"
      >
        <LoadingComponent isLoading={isLoadingUpdateUser}>
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
            onFinish={handleUpdateUser}
            autoComplete="off"
            form={formUpdate}
          >
            <Form.Item
              label="Tên người dùng"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập tên người dùng!',
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail.name}
                onChange={handleOnChangeDetail}
                name="name"
              />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập email!',
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail.email}
                onChange={handleOnChangeDetail}
                name="email"
              />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập số điện thoại!',
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail.phone}
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
                  message: 'Vui lòng nhập địa chỉ!',
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail.address}
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
                  message: 'Vui lòng nhập thành phố!',
                },
              ]}
            >
              <InputComponent
                value={stateUserDetail.city}
                onChange={handleOnChangeDetail}
                name="city"
              />
            </Form.Item>

            <Form.Item
              label="Role admin"
              name="isAdmin"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn True hoặc False!',
                },
              ]}
            >
              <Select
                name="isAdmin"
                value={stateUserDetail?.isAdmin}
                onChange={handleOnChangeIsAdmin}
                style={{
                  width: '100%',
                }}
                options={renderTypeBoolean()}
              />
            </Form.Item>

            <Form.Item
              label="Hình ảnh"
              name="avatar"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn hình ảnh!',
                },
              ]}
            >
              <WrapperUpload onChange={handleOnChangeAvatarDetail} maxCount={1}>
                <Button
                  className={stateUserDetail.avatar ? 'btn-upload' : null}
                >
                  Upload
                </Button>
                {stateUserDetail.avatar && (
                  <img
                    src={stateUserDetail.avatar}
                    alt="avatar"
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '50%',
                      objectFit: 'cover',
                      marginLeft: '20px',
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

      <div style={{ marginTop: '20px' }}>
        <TableComponent
          isLoading={isLoadingUser}
          columns={columns}
          data={dataUserTable}
          pageValue={pageValue}
          totalPagination={totalUser}
          handleDelete={handleDeleteManyUser}
          handleOnChangePage={handleOnChangePage}
          onRow={(record) => {
            return {
              onClick: (event) => {
                setIsRowSelected(record._id)
                setIsEmailUser(record.email)
              },
            }
          }}
        />
      </div>
    </div>
  )
}

export default AdminUser
