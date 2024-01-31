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
  HighlightOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import { TransactionForm } from '../model/transaction'
import { useService } from '../../../../service/service'
import { TransactionProjectOfferingForm } from '../model/projectOffering'

interface Props {
  transactionForm: FormInstance<TransactionForm>
  setModalVisible: React.Dispatch<React.SetStateAction<any>>
  setEditId: React.Dispatch<React.SetStateAction<any>>
  setOfferingType: React.Dispatch<React.SetStateAction<any>>
}

function ProjectOfferingList(props: Props) {
  const { transactionForm, setModalVisible, setEditId, setOfferingType } = props
  const [_] = useTranslation('translation')
  const { Text } = Typography
  const [_deleteOffer, setDeleteOffer] = useState(false)
  const service = useService()
  const projectOfferings: TransactionProjectOfferingForm[] =
    transactionForm.getFieldValue('projectOfferings')

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Confirm Delete',
      centered: true,
      content: 'Are you sure you want to delete!',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const newProjectOfferings = projectOfferings.filter(
          (projectOffering: TransactionProjectOfferingForm) =>
            projectOffering.id !== id
        )
        transactionForm.setFieldValue('projectOfferings', newProjectOfferings)
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

  const renderItem = (
    projectOffering: TransactionProjectOfferingForm,
    index: number
  ) => (
    <List.Item>
      <Card
        title={'Project'}
        extra={
          <>
            <Button
              size="small"
              danger
              type="text"
              onClick={() => {
                handleDelete(projectOffering.id! || index)
                setEditId(projectOffering.id!)
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => {
                setModalVisible(true)
                setEditId(projectOffering.id! || index)
                setOfferingType('project')
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
                {
                  service.metadatums.getDepartment(projectOffering.departmentId)
                    .name
                }
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              {' '}
              <UserOutlined />
              {service.metadatums.getStaff(projectOffering.staffId).fullName}
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <DollarOutlined />
              <Text>{projectOffering.amount}</Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <CarryOutOutlined />
              <Text>{projectOffering.date.format('DD/MM/YYYY')}</Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <PartitionOutlined />
              <Text>
                {service.metadatums.getProject(projectOffering.projectId).name}
              </Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <HighlightOutlined />
              <Text>{projectOffering.descriptions}</Text>
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
          dataSource={projectOfferings}
          renderItem={renderItem}
        />
      </Col>
    </Row>
  )
}

export default ProjectOfferingList
