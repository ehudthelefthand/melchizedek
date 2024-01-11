import { Row, Col, Space, Button, Modal, FormInstance } from 'antd'
import FixOfferingForm from './FixOffering'
import OfferingList from './OfferingList'
import ProjectOfferingForm from './ProjectOffering'
import { PropsWithChildren, useState } from 'react'
import '../transaction.css'
import { TransactionForm } from '../../../model/model'

function OfferingsForm(
  props: PropsWithChildren<{ form: FormInstance<TransactionForm> }>
) {
  const form = props.form
  const [offerType, setOfferType] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)

  return (
    <>
      <Space direction="vertical" size={20} style={{ display: 'flex' }}>
        <Row>
          <Col span={24}>
            <Row>
              <Space>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button
                    onClick={() => {
                      setModalVisible(true)
                      setOfferType(1)
                    }}
                    size="large"
                    type="primary"
                    htmlType="button"
                    disabled
                  >
                    Project
                  </Button>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button
                    onClick={() => {
                      setModalVisible(true)
                      setOfferType(2)
                    }}
                    size="large"
                    type="primary"
                    htmlType="button"
                    disabled
                  >
                    Gift
                  </Button>
                </Col>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Button
                    onClick={() => {
                      setModalVisible(true)
                      setOfferType(3)
                    }}
                    size="large"
                    type="primary"
                    htmlType="button"
                  >
                    Fix
                  </Button>
                </Col>
                <Modal
                  centered
                  open={modalVisible}
                  onCancel={() => setModalVisible(false)}
                  width={800}
                  footer={null}
                  closeIcon={null}
                  destroyOnClose={true}
                >
                  {offerType == 1 ? (
                    <ProjectOfferingForm
                      onCancel={() => setModalVisible(false)}
                      transactionForm={form}
                    />
                  ) : offerType == 2 ? (
                    // <GiftOfferingForm onCancel={() => setModalVisible(false)} />
                    <></>
                  ) : (
                    <FixOfferingForm
                      onCancel={() => setModalVisible(false)}
                      transactionForm={form}
                    />
                  )}
                </Modal>
              </Space>
            </Row>
          </Col>
        </Row>
        <OfferingList transactionForm={form} />
      </Space>
    </>
  )
}

export default OfferingsForm
