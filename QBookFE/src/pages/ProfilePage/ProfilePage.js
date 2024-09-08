import { Breadcrumb, Button, Popconfirm, Upload } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent'
import InputForm from '../../components/InputForm/InputForm'
import * as Message from '../../components/Message/Message'
import useMutationHook from '../../hooks/useMutationHook'
import { updateUser } from '../../redux/slides/userSlice'
import * as UserService from '../../services/UserService'
import { getBase64 } from '../../utils/utils'

const ProfilePage = () => {
  const user = useSelector((state) => state.user)

  const [value, setValue] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    avatar: '',
  })

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    setValue({
      name: user?.name,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      city: user?.city,
      avatar: user?.avatar,
    })
  }, [user])

  const handleOnChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    })
  }

  const handleOnChangeAvatar = async ({ fileList }) => {
    const file = fileList[0]

    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }

    setValue({
      ...value,
      avatar: file.preview,
    })
  }

  const mutation = useMutationHook(({ id, ...rests }) => {
    return UserService.updateUser(id, rests)
  })

  const { data, isSuccess, isError } = mutation

  const handleUpdate = () => {
    mutation.mutate({
      ...value,
      id: user?.id,
    })
  }

  useEffect(() => {
    if (isSuccess && data?.status === 'OK') {
      Message.success('Cập nhật thông tin người dùng thành công!')
      handleGetDetailUser(user?.id, user?.access_token)
    } else if (isError) {
      Message.error('Cập nhật thông tin người dùng thất bại!')
    }
  }, [data, isSuccess, isError])

  const handleGetDetailUser = async (id, token) => {
    const res = await UserService.getUserDetail(id)
    dispatch(updateUser({ ...res?.data, access_token: token }))
  }

  return (
    <div className="flex justify-center">
      <div className="w-[1285px]">
        <div className="mx-3 lg:mx-0 my-5">
          <Breadcrumb
            items={[
              {
                title: (
                  <span
                    onClick={() => navigate('/')}
                    className="cursor-pointer"
                  >
                    Trang chủ
                  </span>
                ),
              },
              {
                title: 'Chi tiết người dùng',
              },
            ]}
          />
        </div>
        <div className="flex justify-center">
          <div className="flex flex-col gap-5 w-full md:w-[500px] h-auto border rounded-md mx-3 my-0 p-5">
            <div className="flex gap-3 items-center text-base">
              <h3 className="basis-1/4">Họ và tên</h3>
              <InputForm
                name="name"
                value={value.name}
                onChange={handleOnChange}
                className="basis-3/4"
              ></InputForm>
            </div>

            <div className="flex gap-3 items-center text-base">
              <h3 className="basis-1/4">Email</h3>
              <InputForm
                name="email"
                value={value.email}
                onChange={handleOnChange}
                className="basis-3/4"
              ></InputForm>
            </div>

            <div className="flex gap-3 items-center text-base">
              <h3 className="basis-1/4">Số điện thoại</h3>
              <InputForm
                name="phone"
                value={value.phone}
                onChange={handleOnChange}
                className="basis-3/4"
              ></InputForm>
            </div>

            <div className="flex gap-3 items-center text-base">
              <h3 className="basis-1/4">Địa chỉ</h3>
              <InputForm
                name="address"
                value={value.address}
                onChange={handleOnChange}
                className="basis-3/4"
              ></InputForm>
            </div>

            <div className="flex gap-3 items-center text-base">
              <h3 className="basis-1/4">Thành phố</h3>
              <InputForm
                name="city"
                value={value.city}
                onChange={handleOnChange}
                className="basis-3/4"
              ></InputForm>
            </div>

            <div className="flex gap-3 items-center text-base">
              <h3 className="basis-1/4">Hình ảnh</h3>
              <div className="flex basis-3/4 gap-1 items-center">
                <Upload onChange={handleOnChangeAvatar} maxCount={1}>
                  <Button>Tải lên</Button>
                </Upload>
              </div>
            </div>

            <div className="flex gap-3 items-center text-base">
              <div className="basis-1/4"></div>
              <div className="basis-3/4">
                {value.avatar && (
                  <img
                    src={value.avatar}
                    alt="avatar"
                    className="w-[80px] h-[80px] rounded-[50%] object-cover"
                  />
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Popconfirm
                title="Cập nhật thông tin"
                description="Bạn có chắc chắn muốn cập nhật thông tin người dùng không?"
                onConfirm={handleUpdate}
                onCancel={() => {}}
                okText="Đồng ý"
                cancelText="Hủy"
              >
                <ButtonComponent type="primary" buttonText="Cập nhật" />
              </Popconfirm>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
