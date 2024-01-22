import { Row, Col, Space, Button, Modal, FormInstance } from 'antd'
import ProjectOfferingForm from './ProjectOffering'
import { PropsWithChildren, useState } from 'react'

import FixOfferingList from './FixOfferingList'
import { TransactionForm } from '../../model/transaction'
import FixOfferingForm from './FixOffering'

function OfferingButtonForm(
  props: PropsWithChildren<{
    paramsId: string | undefined
    transactionForm: FormInstance<TransactionForm>
  }>
) {
  const { paramsId, transactionForm } = props
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
                      transactionForm={transactionForm}
                    />
                  ) : offerType == 2 ? (
                    // <GiftOfferingForm onCancel={() => setModalVisible(false)} />
                    <></>
                  ) : (
                    <FixOfferingForm
                      onCancel={() => setModalVisible(false)}
                      transactionForm={transactionForm}
                      paramsId={paramsId}
                    />
                  )}
                </Modal>
              </Space>
            </Row>
          </Col>
        </Row>
        <Row justify={'center'} style={{ textAlign: 'center' }}>
          <Col span={8}>
            <FixOfferingList transactionForm={transactionForm} />
          </Col>
          <Col span={8}>
            {/* <h4>Gift</h4> */}
            {/* <GiftOfferingList transactionForm={transactionForm} /> */}
          </Col>
          <Col span={8}>
            {/* <h4>Project</h4> */}
            {/* <ProjectOfferingList transactionForm={transactionForm} /> */}
          </Col>
        </Row>
      </Space>
    </>
  )
}

export default OfferingButtonForm
