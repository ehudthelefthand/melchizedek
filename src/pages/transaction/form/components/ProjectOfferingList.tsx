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
  ProjectOutlined,
  ReadOutlined,
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
    <List.Item
      style={{ justifyContent: "center", alignItems: "center" }}
    >
      <Card
        style={{ width: "100%", maxWidth: "400px", minHeight: "220px" }}
        title={'PROJECT'}
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
        <Row gutter={[10, 10]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <PartitionOutlined />
              <Text>{service.metadatums.getDepartment(projectOffering.departmentId).name}</Text>
            </Space>
          </Col>
          <Col span={10} offset={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <UserOutlined />
              <Text>{service.metadatums.getStaff(projectOffering.staffId).fullName}</Text>
            </Space>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <DollarOutlined />
              <Text>
                {projectOffering.amount.toLocaleString('th-TH', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
              </Text>
            </Space>
          </Col>
          <Col span={10} offset={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <CarryOutOutlined />
              <Text>{projectOffering.date.format('DD/MM/YYYY')}</Text>
            </Space>
          </Col>
        </Row>
        <Row gutter={[10, 10]}>
          <Col span={10} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <ProjectOutlined />
              <Text>{service.metadatums.getProject(projectOffering.projectId).name}</Text>
            </Space>
          </Col>
          <Col span={10} offset={4} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'start' }}>
            <Space>
              <ReadOutlined />
              <Text>{projectOffering.descriptions}</Text>
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
      dataSource={projectOfferings}
      renderItem={renderItem}
    />
  )
}

export default ProjectOfferingList
