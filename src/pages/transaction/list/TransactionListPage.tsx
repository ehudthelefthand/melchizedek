import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'

import { Input, Space, Button, Row, Col, Skeleton, Spin, Modal } from 'antd'
import { PageTransactionResponse } from '../../../api/transaction/response/transaction'
import { TransactionList } from './model/transaction'
import TransactionTableView from './components/TableView'
import { useService } from '../../../service/service'
import { FileExcelOutlined, LoadingOutlined } from '@ant-design/icons'
import TransactionReportFilterForm from '../report/TransactionReportFilterForm'
import { initialPagination } from '../../../constants/api'
import { formatedTransaction } from '../form/utils/transactions/transaction'
import { debounce } from '../../../service/debounce'

const { Search } = Input

function TransactionListPage() {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [t] = useTranslation('translation')
  const [transactions, setTransactions] = useState<TransactionList[]>([])
  const [pagination, setPagination] = useState<PageTransactionResponse>()
  const [isLoading, setIsLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(
    initialPagination.currentPage
  )
  const [itemsPerPage, setItemsPerPage] = useState<number>(
    initialPagination.itemsPerPage
  )
  const service = useService()

  const handleSearch = async (fullName: string) => {
    return debounce(await onSearch(fullName), 3000)
  }

  const onSearch = async (fullName: string) => {
    setSearch(fullName)
  }

  const onCancel = () => {
    setModalVisible(false)
  }

  useEffect(() => {
    service.api.transaction
      .getAll(
        {
          currentPage: currentPage,
          itemsPerPage: itemsPerPage,
        },
        search
      )
      .then((pageTransaction) => {
        const transactionFormattedData: TransactionList[] = formatedTransaction(
          pageTransaction,
          service
        )
        if (transactionFormattedData || transactionFormattedData !== null) {
          setTransactions(transactionFormattedData)
          setPagination(pageTransaction)
          return
        }
      })
      .catch((error) => {
        console.error('TransactionPage', error)
        setTransactions([])
        throw new Error(error)
      })
      .finally(() => setIsLoading(false))
  }, [currentPage, itemsPerPage, search])

  return (
    <>
      <Space direction="vertical" size="large" style={{ display: 'flex' }}>
        <Row gutter={[5, 5]}>
          <Col xs={24} sm={24} md={12}>
            <Col>
              <Search
                size="large"
                placeholder={t('transacButton.search')}
                enterButton
                onChange={(e) => handleSearch(e.target.value.toString())}
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
      {isLoading && (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <Skeleton active />
        </Spin>
      )}
    </>
  )
}

export default TransactionListPage
