import { Card, Col, Row, Typography, Space } from 'antd'
import { ToStringTransaction } from '../../../api/transactionapi'
import {
  BankTwoTone,
  DollarTwoTone,
  IdcardTwoTone,
  InteractionTwoTone,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'

const { Text } = Typography

interface Props {
  transactions: ToStringTransaction[]
}

const MobileViewComponent: React.FC<{ props: Props }> = ({ props }) => {
  const { transactions } = props
  const [t] = useTranslation('translation')
  return (
    <Row gutter={[16, 16]}>
      {transactions.map((transaction) => (
        <Col xs={24} sm={12} key={transaction.id}>
          <Card
            key={transaction.id}
            bordered={false}
            title={transaction.donorName}
            extra={transaction.createAt}
          >
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Space>
                  <DollarTwoTone />
                  <Text type="secondary">{t('transacListMobile.amount')}</Text>
                  <Text type="success">{transaction.amount}</Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Space>
                  <IdcardTwoTone />
                  <Text type="secondary">
                    {t('transacListMobile.staffName')}
                  </Text>
                  <Text>{transaction.staffName}</Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Space>
                  <IdcardTwoTone />
                  <Text type="secondary">
                    {t('transacListMobile.department')}
                  </Text>
                  <Text>{transaction.department}</Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Space>
                  <IdcardTwoTone />
                  <Text type="secondary">
                    {t('transacListMobile.dateTransfers')}
                  </Text>
                  <Text strong>{transaction.transferDate}</Text>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Space>
                  <BankTwoTone />
                  <Text type="secondary">
                    {t('transacListMobile.fromBank')}
                  </Text>
                  <Text>{transaction.fromBank}</Text>
                </Space>
              </Col>
              <Col xs={12}>
                <Space>
                  <InteractionTwoTone />
                  <Text type="secondary">{t('transacListMobile.toBank')}</Text>
                  <Text>{transaction.toBank}</Text>
                </Space>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MobileViewComponent
