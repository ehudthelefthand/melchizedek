import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import dayjs from 'dayjs'
import { Input, Space, Button, Row, Col, Skeleton, Spin } from 'antd'
// import MobileViewComponent from './components/MobileView'
import {
  PageTransactionResponse,
  TransactionResponse,
} from '../../../api/transaction/response/transaction'
import { TransactionList } from './model/transaction'
import TableView from './components/TableView'
import { useService } from '../../../service/service'
import { TransactionFixOfferingList } from './model/fixOffering'
import { TransactionGiftOfferingList } from './model/giftOffering'
import { TransactionProjectOfferingList } from './model/projectOffering'
import { LoadingOutlined } from '@ant-design/icons'

const { Search } = Input

function TransactionListPage() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [t] = useTranslation('translation')
  const [transactions, setTransactions] = useState<TransactionList[]>([])
  const [pagination, setPagination] = useState<PageTransactionResponse>()
  const [isLoading, setIsLoading] = useState(true)
  const service = useService()

  useEffect(() => {
    service.api.transaction
      .getAll()
      .then((pageTransaction) => {
        const transactionFormattedData: TransactionList[] =
          pageTransaction.data.map((transaction: TransactionResponse) => {
            const result: TransactionList = {
              id: transaction.id,
              donorName: service.metadatums.getDonor(transaction.donorId)
                .fullName,
              amount: transaction.amount.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              transferDate: dayjs(transaction.transferDate),
              toBankCode: service.metadatums.getBank(transaction.toBankId).code,
              fromBankCode: service.metadatums.getBank(transaction.fromBankId)
                .code,
              staffName: service.metadatums.getStaff(transaction.staffId)
                .fullName,
              departmentName: service.metadatums.getDepartment(
                transaction.departmentId
              ).name,
              descriptions: transaction.descriptions,
              createAt: dayjs(transaction.createAt),
              fixOfferings: transaction.fixOfferings.map((fixOffering) => {
                const fix: TransactionFixOfferingList = {
                  id: fixOffering.id,
                  staffName: service.metadatums.getStaff(fixOffering.staffId)
                    .fullName,
                  departmentName: service.metadatums.getDepartment(
                    fixOffering.departmentId
                  ).name,
                  amount: fixOffering.amount,
                  startMonth: dayjs(fixOffering.startMonth),
                  dueMonth: dayjs(fixOffering.startMonth),
                }

                return fix
              }),
              giftOfferings: transaction.giftOfferings.map((giftOffering) => {
                const gift: TransactionGiftOfferingList = {
                  id: giftOffering.id,
                  staffName: service.metadatums.getStaff(giftOffering.id)
                    .fullName,
                  departmentName: service.metadatums.getDepartment(
                    giftOffering.id
                  ).name,
                  amount: giftOffering.amount,
                  transferDate: dayjs(giftOffering.transferDate),
                }

                return gift
              }),
              projectOfferings: transaction.projectOfferings.map(
                (projectOffering) => {
                  const project: TransactionProjectOfferingList = {
                    id: projectOffering.id,
                    staffName: service.metadatums.getStaff(projectOffering.id)
                      .fullName,
                    departmentName: service.metadatums.getDepartment(
                      projectOffering.id
                    ).name,
                    amount: projectOffering.amount,
                    project: service.metadatums.getProject(projectOffering.id)
                      .name,
                    date: dayjs(projectOffering.date),
                    descriptions: projectOffering.descriptions,
                  }
                  return project
                }
              ),
            }
            return result
          })

        setTransactions(transactionFormattedData)
        setPagination(pageTransaction)
      })
      .catch((error: any) => {
        console.error('TransactionPage', error)
      })
      .finally(() => setIsLoading(false))
  }, [isLoading])

  return (
    <>
      {isLoading ? (
        <>
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
            <Skeleton active />
          </Spin>
        </>
      ) : (
        <Space direction="vertical" size="large" style={{ display: 'flex' }}>
          <Row justify={'space-between'} gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Search
                size="large"
                placeholder={t('transacButton.search')}
                enterButton
              />
            </Col>
            <Col xs={24} md={12}>
              <Link to={'/transaction/create'}>
                <Button size="large" type="primary" className="btn-primary">
                  {t('transacButton.addData')}
                </Button>
              </Link>
            </Col>
          </Row>
          {isMobile ? (
            <></>
          ) : (
            <TableView
              transactions={transactions}
              pagesTransaction={pagination}
            />
          )}
        </Space>
      )}
    </>
  )
}

export default TransactionListPage
