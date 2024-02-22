import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import dayjs from 'dayjs'
import { Input, Space, Button, Row, Col, Skeleton, Spin, Modal } from 'antd'
import {
  PageTransactionResponse,
  TransactionResponse,
} from '../../../api/transaction/response/transaction'
import { TransactionList } from './model/transaction'
import TransactionTableView from './components/TableView'
import { useService } from '../../../service/service'
import { TransactionFixOfferingList } from './model/fixOffering'
import { TransactionGiftOfferingList } from './model/giftOffering'
import { TransactionProjectOfferingList } from './model/projectOffering'
import { FileExcelOutlined, LoadingOutlined } from '@ant-design/icons'
import TransactionReportFilterForm from '../report/TransactionReportFilterForm'
import { initialPagination } from '../../../constants/api'

const { Search } = Input

function TransactionListPage() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [t] = useTranslation('translation')
  const [transactions, setTransactions] = useState<TransactionList[]>([])
  const [pagination, setPagination] = useState<PageTransactionResponse>()
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [currentPage, setCurrentPage] = useState<number>(
    initialPagination.currentPage
  )
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    initialPagination.itemsPerPage
  )
  const service = useService()

  const onCancel = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    service.api.transaction
      .getAll({
        currentPage: currentPage,
        itemsPerPage: itemsPerPage,
      })
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
                .nickName,
              departmentName: service.metadatums.getDepartment(
                transaction.departmentId
              ).name,
              descriptions: transaction.descriptions,
              createAt: dayjs(transaction.createAt),

              fixOfferings: transaction.fixOfferings.map((fixOffering) => {
                const fix: TransactionFixOfferingList = {
                  id: fixOffering.id,
                  staffName: service.metadatums.getStaff(fixOffering.staffId)
                    .nickName,
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
                    .nickName,
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
                      .nickName,
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
              totalOfferings: {
                sumFixOfferings: transaction.totalOfferings.sumFixOfferings,
                sumGiftOfferings: transaction.totalOfferings.sumGiftOfferings,
                sumProjectOfferings:
                  transaction.totalOfferings.sumProjectOfferings,
              },
              images: transaction.images,
            }
            return result
          })

        setTransactions(transactionFormattedData)
        setPagination(pageTransaction)
      })
      .catch((error) => {
        console.error('TransactionPage', error)
      })
      .finally(() => setIsLoading(false))
  }, [currentPage, itemsPerPage])

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
          <Row gutter={[5, 5]}>
            <Col xs={24} sm={24} md={12}>
              <Col>
                <Search
                  size="large"
                  placeholder={t('transacButton.search')}
                  enterButton
                />
              </Col>
            </Col>
            <Col xs={24} sm={24} md={12}>
              <Row justify={'space-between'} gutter={5}>
                <Col xs={12}>
                  <Link to={'/transaction/create'}>
                    <Button
                      size="large"
                      type="primary"
                      style={{ width: isMobile ? '100%' : '' }}
                      className="btn-primary"
                    >
                      {t('transacButton.addData')}
                    </Button>
                  </Link>
                </Col>
                <Col
                  xs={12}
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'end',
                  }}
                >
                  <Button
                    size="large"
                    type="primary"
                    style={{
                      backgroundColor: 'rgb(18,124,67)',
                      width: isMobile ? '100%' : '',
                    }}
                    className="btn-primary"
                    onClick={() => {
                      setModalVisible(true)
                    }}
                  >
                    {/* TODO: translation */}
                    <FileExcelOutlined /> Export
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>

          <Modal
            /* TODO: translation */
            title={<h2 style={{ textAlign: 'center' }}>กรุณาเลือกเดือน</h2>}
            centered
            open={modalVisible}
            onCancel={() => {
              onCancel()
            }}
            footer={null}
            closeIcon={null}
            destroyOnClose={true}
          >
            <TransactionReportFilterForm onCancel={onCancel} />
          </Modal>
          {/* //TODO: mobile ยังไม่พร้อม */}
          {isMobile ? (
            <></>
          ) : (
            <TransactionTableView
              transactions={transactions}
              pagesTransaction={pagination}
              currentPage={currentPage!}
              setCurrentPage={setCurrentPage}
              itemsPerPage={itemsPerPage}
              setItemsPerPage={setItemsPerPage}
            />
          )}
        </Space>
      )}
    </>
  )
}

export default TransactionListPage
