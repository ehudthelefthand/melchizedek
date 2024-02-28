import { Card, Col, Row, Typography, Space, Flex } from 'antd'
import {
  BankTwoTone,
  ClockCircleTwoTone,
  // DeleteOutlined,
  DollarTwoTone,
  // EditOutlined,
  EllipsisOutlined,
  GiftTwoTone,
  GoldTwoTone,
  IdcardTwoTone,
  InteractionTwoTone,
  MessageTwoTone,
  ProjectTwoTone,
  PushpinTwoTone,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import dayjs from 'dayjs'
import { PropsWithChildren } from 'react'
import { TransactionList } from '../model/transaction'

const { Text } = Typography

function MobileView(
  props: PropsWithChildren<{
    transactions: TransactionList[]
    onEdit: Function
    onDelete: Function
  }>
) {
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
            extra={[
              <Space>
                {dayjs(transaction.createAt).format('DD/MM/YYYY HH:mm:ss')}
                <EllipsisOutlined onClick={() => {}} />
              </Space>,
            ]}
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
                  <PushpinTwoTone />
                  <Text type="secondary">
                    {t('transacListMobile.department')}
                  </Text>
                  <Text>{transaction.departmentName}</Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Space>
                  <ClockCircleTwoTone />
                  <Text type="secondary">
                    {t('transacListMobile.dateTransfers')}
                  </Text>
                  <Text strong>
                    {dayjs(transaction.transferDate).format(
                      'DD/MM/YYYY HH:mm:ss'
                    )}
                  </Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Space>
                  <BankTwoTone />
                  <Text type="secondary">{t('transacListMobile.bank')}</Text>
                  <Text>{transaction.bankCode}</Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Space>
                  <InteractionTwoTone />
                  <Text type="secondary">{t('transacListMobile.yfcBank')}</Text>
                  <Text>{transaction.yfcBankCode}</Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Space>
                  <MessageTwoTone />
                  <Text type="secondary">
                    {t('transacListMobile.descriptions')}
                  </Text>
                  <Text>
                    {transaction.descriptions ? transaction.descriptions : '-'}
                  </Text>
                </Space>
              </Col>
              <Col xs={24}>
                <Flex>
                  <Space>
                    {transaction.totalOfferings.sumFixOfferings !== 0 && (
                      <Space>
                        <GoldTwoTone />
                        <Text>
                          FIX: {transaction.totalOfferings.sumFixOfferings}
                        </Text>
                      </Space>
                    )}
                    {transaction.totalOfferings.sumGiftOfferings !== 0 && (
                      <Space>
                        <GiftTwoTone />
                        <Text>
                          GIFT: {transaction.totalOfferings.sumGiftOfferings}
                        </Text>
                      </Space>
                    )}
                    {transaction.totalOfferings.sumProjectOfferings !== 0 && (
                      <Space>
                        <ProjectTwoTone />
                        <Text>
                          PROJECT:{' '}
                          {transaction.totalOfferings.sumProjectOfferings}
                        </Text>
                      </Space>
                    )}
                    {transaction.totalOfferings.sumFixOfferings === 0 &&
                      transaction.totalOfferings.sumGiftOfferings === 0 &&
                      transaction.totalOfferings.sumProjectOfferings === 0 && (
                        <></>
                      )}
                  </Space>
                </Flex>
              </Col>
            </Row>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default MobileView
