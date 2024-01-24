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

interface Props {
  transactionForm: FormInstance<TransactionForm>
}

function FixOfferingList(props: Props) {
  const { transactionForm } = props
  const [t] = useTranslation('translation')
  const { Text } = Typography
  const [modal, setModal] = useState(false)

  const [_, setDeleteOffer] = useState(false)

  const fixOfferings: TransactionFixOfferingForm[] =
    transactionForm.getFieldValue('fixOfferings')

  const handleDelete = (id: number) => {
    Modal.confirm({
      title: 'Confirm Delete',
      centered: true,
      content: 'Are you sure you want to delete this item?',
      okText: 'Yes',
      cancelText: 'No',
      onOk: () => {
        const newOfferings = fixOfferings.filter(
          (fix: TransactionFixOfferingForm) => fix.id !== id
        )
        transactionForm.setFieldValue('fixOfferings', newOfferings)
        setDeleteOffer(true)
        message.success('Item deleted successfully')
      },
    })
  }

  const renderItem = (fix: TransactionFixOfferingForm) => (
    <List.Item>
      <Card
        title={
          <Space>
            {' '}
            <UserOutlined />
            {fix.staff.fullName}
          </Space>
        }
        extra={
          <>
            <Button
              size="small"
              danger
              type="text"
              onClick={() => {
                Modal.confirm({
                  title: `${t('transacMessage.confirmDelete')}`,
                  centered: true,
                  width: 400,
                  onOk() {
                    const newOffering = transactionForm
                      .getFieldValue('fixOfferings')
                      .filter(
                        (fixOfferings: TransactionFixOfferingForm) =>
                          fixOfferings.id !== fix.id
                      )
                    transactionForm.setFieldValue('offerings', newOffering)
                    console.log(
                      'transsss',
                      transactionForm.getFieldValue('fixOfferings')
                    )
                    setDeleteOffer(true)
                    message.success(`${t('transacMessage.deleteSuccess')}`)
                  },
                })
              }}
            >
              <DeleteOutlined />
            </Button>
            <Button
              type="text"
              size="small"
              onClick={() => {
                setModal(true)
              }}
            >
              <EditTwoTone />
            </Button>
            <Modal
              centered
              open={modal}
              onCancel={() => setModal(false)}
              width={800}
              footer={null}
              closeIcon={null}
              destroyOnClose={true}
            ></Modal>
          </>
        }
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Space>
              <PartitionOutlined />
              <Text>{fix.department.name}</Text>
            </Space>
          </Col>
          <Col span={12}>
            <Space>
              <DollarOutlined />
              <Text>{fix.amount}</Text>
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
      {transactionForm
        .getFieldValue('fixOfferings')
        .map((fix: TransactionFixOfferingForm) => (
          <Col xs={24} sm={24} md={24} key={fix.id}>
            <List
              itemLayout="horizontal"
              // bordered
              size="large"
              header={<h3>Fix</h3>}
              dataSource={fixOfferings}
              renderItem={renderItem}

              // extra={
              //   <>
              //     <Button
              //       size="small"
              //       danger
              //       type="text"
              //       onClick={() => {
              //         Modal.confirm({
              //           title: `${t('transacMessage.confirmDelete')}`,
              //           centered: true,
              //           width: 400,
              //           onOk() {
              //             const newOffering = transactionForm
              //               .getFieldValue('fixOfferings')
              //               .filter(
              //                 (fixOfferings: TransactionFixOfferingForm) =>
              //                   fixOfferings.id !== fix.id
              //               )
              //             transactionForm.setFieldValue(
              //               'offerings',
              //               newOffering
              //             )
              //             console.log(
              //               'transsss',
              //               transactionForm.getFieldValue('fixOfferings')
              //             )
              //             setDeleteOffer(true)
              //             message.success(
              //               `${t('transacMessage.deleteSuccess')}`
              //             )
              //           },
              //         })
              //       }}
              //     >
              //       <DeleteOutlined />
              //     </Button>
              //     <Button
              //       type="text"
              //       size="small"
              //       onClick={() => {
              //         setModal(true)
              //       }}
              //     >
              //       <EditTwoTone />
              //     </Button>
              //     <Modal
              //       centered
              //       open={modal}
              //       onCancel={() => setModal(false)}
              //       width={800}
              //       footer={null}
              //       closeIcon={null}
              //       destroyOnClose={true}
              //     ></Modal>
              //   </>
              // }
            />
            {/* <Row gutter={[8, 8]}>
                <Col span={8}>
                  <Space>
                    <UserOutlined />
                    <Text>{fix.staffName}</Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space>
                    <PartitionOutlined />
                    <Text>{fix.department}</Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space>
                    <DollarOutlined />
                    <Text>{fix.amount}</Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space>
                    <CarryOutOutlined />
                    <Text>{fix.startMonth.format('MM/YYYY')}</Text>
                  </Space>
                </Col>
                <Col span={8}>
                  <Space>
                    <FieldTimeOutlined />
                    <Text>{fix.dueMonth.format('MM/YYYY')}</Text>
                  </Space>
                </Col>
              </Row> */}
          </Col>
        ))}
    </Row>
  )
}

export default FixOfferingList
