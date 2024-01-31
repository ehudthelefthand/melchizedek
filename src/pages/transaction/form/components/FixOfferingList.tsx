import {
  Button,
  Card,
  Col,
  FormInstance,
  List,
  Modal,
  Row,
  Space,
  Typography,
  message,
} from 'antd'
import {
  UserOutlined,
  DollarOutlined,
  PartitionOutlined,
  FieldTimeOutlined,
  CarryOutOutlined,
  DeleteOutlined,
  EditTwoTone,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { TransactionForm } from '../model/transaction'
import { TransactionFixOfferingForm } from '../model/fixOffering'
import { useService } from '../../../../service/service'

interface Props {
  transactionForm: FormInstance<TransactionForm>
  setModalVisible: React.Dispatch<React.SetStateAction<any>>
  setEditId: React.Dispatch<React.SetStateAction<any>>
  setOfferingType: React.Dispatch<React.SetStateAction<any>>
}

function FixOfferingList(props: Props) {
  const { transactionForm, setModalVisible, setEditId, setOfferingType } = props
  const [_] = useTranslation('translation')
  const { Text } = Typography
  const [_deleteOffer, setDeleteOffer] = useState(false)
  const service = useService()
  const fixOfferings: TransactionFixOfferingForm[] =
    transactionForm.getFieldValue('fixOfferings')

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Confirm Delete',
      centered: true,
      content: 'Are you sure you want to delete!',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const newOfferings = fixOfferings.filter(
          (fix: TransactionFixOfferingForm) => fix.id !== id
        )
        transactionForm.setFieldValue('fixOfferings', newOfferings)
        setDeleteOffer(true)
        message.success('Item deleted successfully')
        setEditId(null)
      },
      onCancel: () => {
        setDeleteOffer(true)
        setEditId(null)
      },
    })

    setDeleteOffer(false)
  }

  const renderItem = (fix: TransactionFixOfferingForm, index: number) => (
    <List.Item>
      <Card
        title={'Fix'}
        extra={
          <>
            <Button
              size="small"
              danger
              type="text"
              onClick={() => {
                handleDelete(fix.id! || index)
                setEditId(fix.id!)
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => {
                setModalVisible(true)
                setEditId(fix.id! || index)
                setOfferingType('fix')
              }}
            >
              <EditTwoTone />
            </Button>
          </>
        }
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Space>
              <PartitionOutlined />
              <Text>
                {service.metadatums.getDepartment(fix.departmentId).name}
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              {' '}
              <UserOutlined />
              {service.metadatums.getStaff(fix.staffId).fullName}
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <DollarOutlined />
              <Text>
                {fix.amount.toLocaleString('th-TH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <CarryOutOutlined />
              <Text>{fix.startMonth.format('MM/YYYY')}</Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <FieldTimeOutlined />
              <Text>{fix.dueMonth.format('MM/YYYY')}</Text>
            </Space>
          </Col>
        </Row>
      </Card>
    </List.Item>
  )

  return (
    <Row gutter={[8, 8]}>
      <Col xs={24} sm={24} md={24}>
        <List
          itemLayout="horizontal"
          // bordered
          size="large"
          dataSource={fixOfferings}
          renderItem={renderItem}
        />
      </Col>
    </Row>
  )
}

export default FixOfferingList
