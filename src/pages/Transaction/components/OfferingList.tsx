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
  CalendarOutlined,
  BookOutlined,
  FieldTimeOutlined,
  CarryOutOutlined,
  DeleteOutlined,
  EditTwoTone,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

import { useState } from 'react'
// import { Offering } from '../../../api/models'
// import ProjectOfferingForm from './ProjectOffering'
import FixOfferingForm from './FixOffering'
// import GiftOfferingForm from './GiftOffering'
import { TransactionForm, TransactionOfferingForm } from '../../../model/model'

interface Props {
  transactionForm: FormInstance<TransactionForm>
}

function OfferingList(props: Props) {
  const { transactionForm } = props
  const [t] = useTranslation('translation')
  const { Text } = Typography
  const [modal, setModal] = useState(false)
  // for editModal
  const [editOffer, seteEditOffer] = useState<TransactionOfferingForm>()
  const [_, setDeleteOffer] = useState<TransactionOfferingForm>()

  return (
    <Row gutter={[8, 8]}>
      {transactionForm
        .getFieldValue('offerings')
        .map((offering: TransactionOfferingForm) => (
          <Col xs={24} sm={12} md={8} key={offering.id}>
            <Card
              title={offering.kind}
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
                              (offerings: TransactionOfferingForm) =>
                                offerings.id !== offering.id
                            )
                          transactionForm.setFieldValue(
                            'offerings',
                            newOffering
                          )
                          console.log(
                            'transsss',
                            transactionForm.getFieldValue('offerings')
                          )
                          setDeleteOffer(offering)
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
                      seteEditOffer(offering)
                      console.log('editOfferrrr', offering)
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
                  >
                    {editOffer?.kind === 'Project' ? (
                      // <ProjectOfferingForm
                      //   onCancel={() => setModal(false)}
                      //   offerID={offer.id}
                      // />
                      <></>
                    ) : editOffer?.kind === 'Fix' ? (
                      <FixOfferingForm
                        onCancel={() => setModal(false)}
                        offerID={editOffer.id}
                        transactionForm={transactionForm}
                      />
                    ) : editOffer?.kind === 'Gift' ? (
                      // <GiftOfferingForm
                      //   onCancel={() => setModal(false)}
                      //   offerID={editOffer.id}
                      // />
                      <></>
                    ) : (
                      <></>
                    )}
                  </Modal>
                </>
              }
              headStyle={{ textAlign: 'center' }}
              style={{ height: 220 }}
            >
              {offering.kind === 'Project' ? (
                <Row gutter={[8, 8]}>
                  <Col xs={12}>
                    <Space>
                      <UserOutlined />
                      <Text>{offering.staffName}</Text>
                    </Space>
                  </Col>
                  <Col xs={12}>
                    <Space>
                      <PartitionOutlined />
                      <Text>{offering.department}</Text>
                    </Space>
                  </Col>
                  <Col xs={12}>
                    <Space>
                      <DollarOutlined />
                      <Text>{offering.amount}</Text>
                    </Space>
                  </Col>
                  <Col xs={12}>
                    <Space>
                      <CalendarOutlined />
                      <Text> {offering.startDate.format('DD/MM/YYYY')}</Text>
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Space>
                      <BookOutlined />
                      <Text> {offering.projectName}</Text>
                    </Space>
                  </Col>
                </Row>
              ) : offering.kind === 'Fix' ? (
                <Row gutter={[8, 8]}>
                  <Col xs={12}>
                    <Space>
                      <UserOutlined />
                      <Text>{offering.staffName}</Text>
                    </Space>
                  </Col>
                  <Col xs={12}>
                    <Space>
                      <PartitionOutlined />
                      <Text>{offering.department}</Text>
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Space>
                      <DollarOutlined />
                      <Text>{offering.amount}</Text>
                    </Space>
                  </Col>
                  <Col xs={12}>
                    <Space>
                      <CarryOutOutlined />
                      <Text>{offering.startDate.format('DD/MM/YYYY')}</Text>
                    </Space>
                  </Col>
                  <Col xs={12}>
                    <Space>
                      <FieldTimeOutlined />
                      <Text>{offering.dueDate.format('DD/MM/YYYY')}</Text>
                    </Space>
                  </Col>
                </Row>
              ) : (
                <Row gutter={[8, 8]}>
                  <Col xs={12}>
                    <Space>
                      <UserOutlined />
                      <Text>{offering.staffName}</Text>
                    </Space>
                  </Col>
                  <Col xs={12}>
                    <Space>
                      <PartitionOutlined />
                      <Text>{offering.department}</Text>
                    </Space>
                  </Col>
                  <Col xs={24}>
                    <Space>
                      <DollarOutlined />
                      <Text>{offering.amount}</Text>
                    </Space>
                  </Col>
                </Row>
              )}
            </Card>
          </Col>
        ))}
    </Row>
  )
}

export default OfferingList
