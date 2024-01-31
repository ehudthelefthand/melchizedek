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
  CarryOutOutlined,
  DeleteOutlined,
  EditTwoTone,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { TransactionForm } from '../model/transaction'
import { useService } from '../../../../service/service'
import { TransactionGiftOfferingForm } from '../model/giftOffering'

interface Props {
  transactionForm: FormInstance<TransactionForm>
  setModalVisible: React.Dispatch<React.SetStateAction<any>>
  setEditId: React.Dispatch<React.SetStateAction<any>>
  setOfferingType: React.Dispatch<React.SetStateAction<any>>
}

function GiftOfferingList(props: Props) {
  const { transactionForm, setModalVisible, setEditId, setOfferingType } = props
  const [_] = useTranslation('translation')
  const { Text } = Typography
  const [_deleteOffer, setDeleteOffer] = useState(false)
  const service = useService()
  const giftOfferings: TransactionGiftOfferingForm[] =
    transactionForm.getFieldValue('giftOfferings')

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Confirm Delete',
      centered: true,
      content: 'Are you sure you want to delete!',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const newOfferings = giftOfferings.filter(
          (gift: TransactionGiftOfferingForm) => gift.id !== id
        )
        transactionForm.setFieldValue('giftOfferings', newOfferings)
        setDeleteOffer(true)
        message.success('Item deleted successfully')
        setEditId(null)
        setOfferingType(null)
      },
      onCancel: () => {
        setDeleteOffer(true)
        setEditId(null)
        setOfferingType(null)
      },
    })
    setOfferingType(null)
    setDeleteOffer(false)
  }

  const renderItem = (gift: TransactionGiftOfferingForm, index: number) => (
    <List.Item>
      <Card
        title={'Gift'}
        extra={
          <>
            <Button
              size="small"
              danger
              type="text"
              onClick={() => {
                handleDelete(gift.id! || index)
                setEditId(gift.id!)
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => {
                setModalVisible(true)
                setEditId(gift.id! || index)
                setOfferingType('gift')
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
                {service.metadatums.getDepartment(gift.departmentId).name}
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              {' '}
              <UserOutlined />
              {service.metadatums.getStaff(gift.staffId).fullName}
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <DollarOutlined />
              <Text>
                {gift.amount.toLocaleString('th-TH', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </Text>
            </Space>
          </Col>
          <Col span={24}>
            <Space>
              <CarryOutOutlined />
              <Text>{gift.transferDate.format('DD/MM/YYYY')}</Text>
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
          dataSource={giftOfferings}
          renderItem={renderItem}
        />
      </Col>
    </Row>
  )
}

export default GiftOfferingList
