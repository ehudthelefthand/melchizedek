import { Form, SelectProps } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useService } from '../../../service/service'
import { useState } from 'react'
import { debounce } from '../../../service/debounce'
import { DonorForm } from '../model/donor'
import { DonorCreateRequest } from '../../../api/donor/request'

const useDonorForm = () => {
  const [donorForm] = Form.useForm<DonorForm>()
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
    return await service.api.user.validate({username:value})
  }

  const validateUserName = async (value: string) => {
    try {
      const result = await isUsernameExists(value)
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

  const onSubmit = (value: DonorCreateRequest) => {
   console.log('value by form: ', value)
    // TODO: API Donor request

    navigate('/transaction')
  }

  return {
    errorMessage,
    donorForm,
    onSubmit,
    departmentAPI,
    role,
    setErrorMessage,
    handleValidateUsername,
  }
}

export default useDonorForm
