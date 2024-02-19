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
  const [message, setMessage] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string>('')

  const departmentAPI: SelectProps['options'] = service.metadatums
    .getAllDepartments()
    .map((department) => ({
      label: department.name,
      value: department.name,
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
    return await service.api.user.validate({ username: value })
  }

  const validateUserName = async (value: string) => {
    try {
      if (!value) return
      const temp = value.trim()
      setMessage('')
      const result = await isUsernameExists(temp)
      setMessage('สามารถใช้ชื่อผู้ใช้ได้')
      return Promise.resolve(result)
    } catch (error) {
      console.error(error)
      setMessage('')
      setErrorMessage('ชื่อผู้ใช้นี้มีในระบบแล้ว')
      return Promise.reject(`${errorMessage}`)
    }
  }

  const handleValidateUsername = async (username: string) => {
    return debounce(await validateUserName(username), 2000)
  }

  const onSubmit = (value: UserCreateRequest) => {
    // TODO: API

    const createUser: UserCreateRequest = {
      username: value.username,
      password: value.password,
      fullNameTH: value.fullNameTH,
      fullNameEN: value.fullNameEN,
      nickName: value.nickName,
      department: value.department,
      role: value.role,
    }

    service.api.user.create(createUser)

    navigate('/user')
  }

  return {
    message,
    errorMessage,
    userForm,
    onSubmit,
    departmentAPI,
    role,
    setMessage,
    setErrorMessage,
    handleValidateUsername,
  }
}

export default useUserForm
