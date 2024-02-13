import {
  Button,
  Card,
  Col,
  FormInstance,
  List,
  Modal,
  Row,
  Space,
  message,
  Typography
} from 'antd'
import {
  UserOutlined,
  DollarOutlined,
  PartitionOutlined,
  CarryOutOutlined,
  DeleteOutlined,
  EditTwoTone,
  MinusOutlined,
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
    <List.Item
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Card
        style={{ width: "100%", maxWidth: "400px", minHeight: "220px" }}
        title={'FIX'}
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
        <Row gutter={[10, 10]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <PartitionOutlined />
              <Text>{service.metadatums.getDepartment(fix.departmentId).name}</Text>
            </Space>
          </Col>
          <Col span={10} offset={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <UserOutlined />
              <Text>{service.metadatums.getStaff(fix.staffId).fullName}</Text>
            </Space>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={24} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
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
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <CarryOutOutlined />
              <Text>{fix.startMonth.format('MM/YYYY')}</Text>
            </Space>
          </Col>
          <Col span={4}>
            <MinusOutlined />
          </Col>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <CarryOutOutlined />
              <Text>{fix.dueMonth.format('MM/YYYY')}</Text>
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
      dataSource={fixOfferings}
      renderItem={renderItem}
    />
  )
}

export default FixOfferingList
