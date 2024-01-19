import {
  Button,
  Card,
  Col,
  FormInstance,
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

import {
  TransactionFixOfferingForm,
  TransactionForm,
} from '../../../model/model'

interface Props {
  transactionForm: FormInstance<TransactionForm>
}

function OfferingList(props: Props) {
  const { transactionForm } = props
  const [t] = useTranslation('translation')
  const { Text } = Typography
  const [modal, setModal] = useState(false)
  // for editModal
  const [editFixOffering, setEditFixOffering] =
    useState<TransactionFixOfferingForm>()

  const [_, setDeleteOffer] = useState(false)

  return (
    <Row gutter={[8, 8]}>
      {transactionForm
        .getFieldValue('fixOfferings')
        .map((fix: TransactionFixOfferingForm) => (
          <Col xs={24} sm={12} md={8} key={fix.id}>
            <Card
              title={'Fix'}
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
                            .getFieldValue('offerings')
                            .filter(
                              (fixOfferings: TransactionFixOfferingForm) =>
                                fixOfferings.id !== fix.id
                            )
                          transactionForm.setFieldValue(
                            'offerings',
                            newOffering
                          )
                          console.log(
                            'transsss',
                            transactionForm.getFieldValue('offerings')
                          )
                          setDeleteOffer(true)
                          message.success(
                            `${t('transacMessage.deleteSuccess')}`
                          )
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
              headStyle={{ textAlign: 'center' }}
              style={{ height: 220 }}
            >
              <Row gutter={[8, 8]}>
                <Col xs={12}>
                  <Space>
                    <UserOutlined />
                    {/* <Text>{fix.staffName}</Text> */}
                  </Space>
                </Col>
                <Col xs={12}>
                  <Space>
                    <PartitionOutlined />
                    {/* <Text>{fix.department}</Text> */}
                  </Space>
                </Col>
                <Col xs={24}>
                  <Space>
                    <DollarOutlined />
                    <Text>{fix.amount}</Text>
                  </Space>
                </Col>
                <Col xs={12}>
                  <Space>
                    <CarryOutOutlined />
                    <Text>{fix.startMonth.format('MM/YYYY')}</Text>
                  </Space>
                </Col>
                <Col xs={12}>
                  <Space>
                    <FieldTimeOutlined />
                    <Text>{fix.dueMonth.format('MM/YYYY')}</Text>
                  </Space>
                </Col>
              </Row>
              )
            </Card>
          </Col>
        ))}
    </Row>
  )
}

export default OfferingList
