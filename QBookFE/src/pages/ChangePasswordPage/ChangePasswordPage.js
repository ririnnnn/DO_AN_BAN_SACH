import { Breadcrumb, Button, Form, Input, message } from 'antd'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useMutationHook from '../../hooks/useMutationHook'
import * as UserService from '../../services/UserService'

function ChangePasswordPage() {
  const [form] = Form.useForm()

  const navigate = useNavigate()

  const user = useSelector((state) => state.user)

  const mutationChangePassword = useMutationHook(({ userId, data }) => {
    return UserService.changePassword(userId, data)
  })

  const {
    data: dataChangePassword,
    isSuccess: isSuccessChangePassword,
    isError: isErrorChangePassword,
  } = mutationChangePassword

  useEffect(() => {
    if (isSuccessChangePassword && dataChangePassword?.status === 'OK') {
      message.success('Thay đổi mật khẩu thành công!')
      navigate('/sign-in')
      form.resetFields()
    } else if (
      isErrorChangePassword &&
      dataChangePassword?.status === 'ERROR'
    ) {
      message.error(`${dataChangePassword?.message}`)
    }
  }, [isSuccessChangePassword, isErrorChangePassword])

  const handleChangePassword = (values) => {
    const { currentPassword, newPassword, confirmPassword } = values

    if (newPassword !== confirmPassword) {
      message.error('Mật khẩu mới và nhập lại mật khẩu mới phải trùng nhau!')
      return
    }

    mutationChangePassword.mutate({
      userId: user?.id,
      data: values,
    })
  }

  return (
    <div className="flex justify-center">
      <div className="w-[1285px]">
        <div className="mx-3 md:mx-0 my-5">
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
                title: 'Thay đổi mật khẩu',
              },
            ]}
          />
        </div>
        <div className="flex justify-center">
          <div className="w-full md:max-w-[800px] mx-3 mt-5 md:mt-10">
            <Form
              name="basic"
              labelCol={{
                span: 6,
              }}
              labelAlign="left"
              wrapperCol={{
                span: 16,
              }}
              initialValues={{
                remember: true,
              }}
              form={form}
              onFinish={handleChangePassword}
              autoComplete="off"
            >
              <Form.Item
                label="Mật khẩu hiện tại"
                name="currentPassword"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu hiện tại!',
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Mật khẩu mới"
                name="newPassword"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập mật khẩu mới!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="confirmPassword"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập lại mật khẩu mới!',
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                wrapperCol={{
                  // offset: 6,
                  span: 16,
                }}
              >
                <Button type="primary" htmlType="submit">
                  Cập nhật
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChangePasswordPage
