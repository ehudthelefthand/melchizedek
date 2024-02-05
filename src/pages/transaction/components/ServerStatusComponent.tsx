import { STATUS } from '../../../constants/api'
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons'
import { Tag } from 'antd'

const SuccessComponent = (status: STATUS) => {
  return (
    <Tag icon={<CheckCircleOutlined />} color={status}>
      {status}
    </Tag>
  )
}

const ProcessingComponent = (status: STATUS) => {
  return (
    <Tag icon={<SyncOutlined spin />} color={status}>
      {status}
    </Tag>
  )
}

const ErrorComponent = (status: STATUS) => {
  return (
    <Tag icon={<CloseCircleOutlined />} color={status}>
      {status}
    </Tag>
  )
}

export const ProcessStatus = (status: STATUS) => {
  const resultComponent = {
    [STATUS.success]: SuccessComponent(status),
    [STATUS.processing]: ProcessingComponent(status),
    [STATUS.error]: ErrorComponent(status),
  }

  return resultComponent[status] ?? resultComponent.error
}
