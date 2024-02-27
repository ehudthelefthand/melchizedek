import { Card, Col, Divider, List, Row, Space, Typography, Image, Modal, Spin, Skeleton } from 'antd'
import { } from 'antd/es/list'
import { PropsWithChildren, useEffect, useState } from 'react'
import { TransactionList } from '../model/transaction'
import { PageTransactionResponse } from '../../../../api/transaction/response/transaction'
import { BankOutlined, CalendarOutlined, DeleteOutlined, DollarTwoTone, EditOutlined, FunctionOutlined, GiftOutlined, InboxOutlined, LoadingOutlined, MinusOutlined, PartitionOutlined, ProjectOutlined, ReadOutlined, UserOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const baseURL = import.meta.env.VITE_REACT_PUBLIC_CORE_API

function TransactionMobileView(
  props: PropsWithChildren<{
    transactions: TransactionList[]
    pagesTransaction: PageTransactionResponse | undefined
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<any>>
    itemsPerPage: number
    setItemsPerPage: React.Dispatch<React.SetStateAction<any>>
    onDelete: (id: number) => void
  }>
) {
  const { transactions, pagesTransaction, currentPage, setCurrentPage, itemsPerPage, onDelete } = props
  const [t] = useTranslation('translation')
  const { Text } = Typography
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [currentPage])

  function onEdit(transaction: TransactionList) { navigate(`/transaction/edit/${transaction.id}`) }

  const deleteModal = (transaction: TransactionList) => {
    Modal.confirm({
      title: `${t('transacMessage.confirmDelete')}`,
      centered: true,
      width: 400,
      onOk: () => {
        onDelete(transaction.id)
      }
    })
  }

  const transactionItem = (transaction: TransactionList) => {
    return (
      <List.Item
        key={transaction.id}
      >
        <Card
          title={transaction.donorName}
          extra={
            <Space>
              <CalendarOutlined />
              <Text>{transaction.createAt.format('DD/MM/YYYY HH:mm:ss')}</Text>
            </Space>}
          actions={[
            <EditOutlined
              onClick={() => onEdit(transaction)}
              style={{ cursor: 'pointer', color: '#2196F3', fontSize: 20 }}
            />,
            <DeleteOutlined
              onClick={() => deleteModal(transaction)}
              style={{ cursor: 'pointer', color: '#a9a9a9', fontSize: 20 }}
            />
          ]}
        >
          <Row gutter={[0, 7]}>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <DollarTwoTone />
                <Text style={{ color: 'rgb(18,124,67)' }}>{transaction.amount}</Text>
              </Space>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <CalendarOutlined />
                <Text>{transaction.transferDate.format('DD/MM/YYYY HH:mm:ss')}</Text>
              </Space>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <BankOutlined />
                <Text>{transaction.bankCode}</Text>
              </Space>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <BankOutlined />
                <Text>{transaction.yfcBankCode}</Text>
              </Space>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <UserOutlined />
                <Text>{transaction.staffName}</Text>
              </Space>
            </Col>
            <Col span={12} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <Space>
                <PartitionOutlined />
                <Text>{transaction.departmentName}</Text>
              </Space>
            </Col>
          </Row>
          <Row>
            <Divider>Offerings</Divider>
            {transaction.totalOfferings.sumFixOfferings !== 0 && (
              <Col span={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Space>
                  <FunctionOutlined />
                  <Text>FIX: {transaction.totalOfferings.sumFixOfferings}</Text>
                </Space>
              </Col>
            )}

            {transaction.totalOfferings.sumGiftOfferings !== 0 && (
              <Col span={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Space>
                  <GiftOutlined />
                  <Text>GIFT: {transaction.totalOfferings.sumGiftOfferings}</Text>
                </Space>
              </Col>
            )}

            {transaction.totalOfferings.sumProjectOfferings !== 0 && (
              <Col span={8} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Space>
                  <ProjectOutlined />
                  <Text>PROJECT: {transaction.totalOfferings.sumProjectOfferings}</Text>
                </Space>
              </Col>
            )}

            {transaction.totalOfferings.sumFixOfferings === 0 &&
              transaction.totalOfferings.sumGiftOfferings === 0 &&
              transaction.totalOfferings.sumProjectOfferings === 0 && (
                <Col><Text><MinusOutlined /></Text></Col>
              )}
            <Divider />
          </Row>
          <Row>
            <Col span={24} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              {transaction.descriptions === '' && (
                <Text><MinusOutlined /></Text>
              )}
              {transaction.descriptions !== '' && (
                <Space>
                  <ReadOutlined />
                  <Text>{transaction.descriptions}</Text>
                </Space>
              )}
            </Col>
          </Row>
          <Row>
            <Divider>Slip</Divider>
            {transaction.images.length > 0 ? (
              <Col span={6} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Space>
                  {transaction.images.map((imageName) => (
                    <Image
                      key={imageName}
                      src={`${baseURL}/image/${imageName}`}
                    />
                  ))}
                </Space>
              </Col>
            ) : (
              <Col span={24} style={{ textAlign: 'center' }}>
                <Space>
                  <InboxOutlined style={{ fontSize: 40, color: '#bfbfbf' }} />
                </Space>
              </Col>
            )}
          </Row>
        </Card>
      </List.Item>
    )
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  return (
    <>
      {isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <Skeleton active />
        </Spin>
      ) : (
        <List
          grid={{
            gutter: [10, 10],
            md: 2,
          }}
          itemLayout="vertical"
          pagination={{
            current: currentPage,
            pageSize: itemsPerPage,
            total: pagesTransaction?.totalItems,
            onChange: handlePageChange,
            pageSizeOptions: [10, 20, 40, 60, 100],
          }}
          dataSource={transactions}
          renderItem={transactionItem}
        />
      )}
    </>
  )
}

export default TransactionMobileView
