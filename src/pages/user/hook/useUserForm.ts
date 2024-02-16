import { Form, SelectProps } from 'antd'
import { UserForm } from '../model/user'
import { UserCreateRequest } from '../../../api/user/request'
import { useNavigate } from 'react-router-dom'
import { useService } from '../../../service/service'
import { useState } from 'react'
import { debounce } from '../../../service/debounce'

const useUserForm = () => {
  const [userForm] = Form.useForm<UserForm>()
  const navigate = useNavigate()
  const service = useService()
  const [errorMessage, setErrorMessage] = useState<string>('')

  const departmentAPI: SelectProps['options'] = service.metadatums
    .getAllDepartments()
    .map((department) => ({
      label: department.name,
      value: department.id,
    }))

  const role: SelectProps['options'] = [
    {
      label: 'ADMIN',
      value: 'admin',
    },
    {
      label: 'STAFF',
      value: 'staff',
    },
  ]

  const isUsernameExists = async (value: string) => {
    return await service.api.user.validate(value)
  }

  const validateUserName = async (value: string) => {
    try {
      const result = await isUsernameExists(value)
      console.log('result', result)
      if (result.status.exists) {
        setErrorMessage('ชื่อผู้ใช้นี้มีในระบบแล้ว!')
        return Promise.reject(`${errorMessage}`)
      }
      return Promise.resolve()
    } catch (error) {
      console.error(error)
      setErrorMessage('เกิดข้อผิดพลาดในการตรวจสอบชื่อผู้ใช้')
      return Promise.reject(`${errorMessage}`)
    }
  }

  const handleValidateUsername = (name: string) => {
    debounce(validateUserName(name), 2000)
  }

  const onSubmit = (value: UserCreateRequest) => {
    // TODO: API

    // service.api.user.create({
    //   username: value.username,
    //   password: value.password,
    //   fullNameTH: value.fullNameTH,
    //   fullNameEN: value.fullNameEN,
    //   nickName: value.nickName,
    //   department: value.department,
    //   role: value.role,
    // })

    const test: UserCreateRequest = {
      username: value.username,
      password: value.password,
      fullNameTH: value.fullNameTH,
      fullNameEN: value.fullNameEN,
      nickName: value.nickName,
      department: value.department,
      role: value.role,
    }
    console.log(`createUser`, test)
    navigate('/transaction')
  }

  return {
    errorMessage,
    userForm,
    onSubmit,
    departmentAPI,
    role,
    setErrorMessage,
    handleValidateUsername,
  }
}

export default useUserForm
