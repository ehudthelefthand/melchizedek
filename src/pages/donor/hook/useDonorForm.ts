import { Form, SelectProps, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useService } from '../../../service/service'
import { DonorForm } from '../model/donor'
import { DonorCreateRequest } from '../../../api/donor/request'

const useDonorForm = () => {
  const [donorForm] = Form.useForm<DonorForm>()
  const navigate = useNavigate()
  const service = useService()

  const staffAPI: SelectProps['options'] = service.metadatums
    .getAllStaffs()
    .map((staff) => ({
      label: staff.firstName,
      value: staff.firstName,
    }))

  const type: SelectProps['options'] = [
    { label: 'Fix', value: 'Fix' },
    { label: 'Gift', value: 'Gift' },
    { label: 'Project', value: 'Project' },
  ]

  const onSubmit = (value: DonorCreateRequest) => {
    const createDonor: DonorCreateRequest = {
      fullName: value.fullName,
      prefix: value.prefix,
      type: value.type,
      staff: value.staff,
    }

    service.api.donor
      .create(createDonor)
      .then(() => {
        message.success('Create Donor Success fully!')
        window.location.reload()
      })
      .catch((error) => {
        console.error(error)
        message.error('Sorry, Create Donor Fail!')
      })
      .finally(() => navigate('/donor'))

    navigate('/donor')
  }

  return {
    donorForm,
    onSubmit,
    staffAPI,
    type,
  }
}

export default useDonorForm
