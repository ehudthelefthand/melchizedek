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
    <List.Item
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Card
        style={{ width: "100%", maxWidth: "400px", minHeight: "220px" }}
        title={'GIFT'}
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
        <Row gutter={[10, 10]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <PartitionOutlined />
              <Text>{service.metadatums.getDepartment(gift.departmentId).name}</Text>
            </Space>
          </Col>
          <Col span={10} offset={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <UserOutlined />
              <Text>{service.metadatums.getStaff(gift.staffId).fullName}</Text>
            </Space>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
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
          <Col span={10} offset={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
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
    <List
      itemLayout="horizontal"
      size="large"
      dataSource={giftOfferings}
      renderItem={renderItem}
    />
  )
}

export default GiftOfferingList
