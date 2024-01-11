import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import dayjs from 'dayjs'
import { Input, Space, Button, Row, Col } from 'antd'
import API from '../../api'
import {
  PageTransaction,
  ToStringTransaction,
  TransactionAPI,
} from '../../api/transactionapi'
import TableView from './components/TableViewConponent'
import MobileViewComponent from './components/MobileViewComponent'
import { Banks, Department, Donor, Staff } from '../../api/models'

const { Search } = Input

const TransactionPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [t] = useTranslation('translation')
  const [pageTransactions, setPageTransactions] = useState<PageTransaction>()
  const [onlyTrans, setOnlyTrans] = useState<ToStringTransaction[]>([])

  // Metadatums
  const [banks, setBanks] = useState<Banks[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [staff, setStaff] = useState<Staff[]>([])
  const [donor, setDonor] = useState<Donor[]>([])

  useEffect(() => {
    API.getTranactions()
      .then((transaction) => {
        const transactionFormattedData = transaction.data.data.map(
          (transac: TransactionAPI) => {
            return {
              ...transac,
              createAt: dayjs(transac.createAt).format('DD/MM/YYYY HH:mm:ss'),
              transferDate: dayjs(transac.transferDate).format(
                'DD/MM/YYYY HH:mm:ss'
              ),
              // amount: parseFloat(transac.amount.toString()),
              amount: transac.amount.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
            }
          }
        )
        console.log('format tranaction', transactionFormattedData)
        setPageTransactions(transaction)
        setOnlyTrans(transactionFormattedData)
      })
      .catch(console.error)

    API.getMetadatum()
      .then((metadatums) => {
        console.log('metadatums <<', metadatums)
        setBanks(metadatums.data.Bank)
        setDepartments(metadatums.data.Department)
        setStaff(metadatums.data.Staff)
        setDonor(metadatums.data.Donor)
      })
      .catch(console.error)
  }, [])

  return (
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
          <Link
            to={'/transaction/form'}
            state={{ transactionID: onlyTrans.length }}
          >
            <Button size="large" type="primary" className="btn-primary">
              {t('transacButton.addData')}
            </Button>
          </Link>
        </Col>
      </Row>
      {isMobile ? (
        <MobileViewComponent
          props={{
            transactions: onlyTrans,
          }}
        />
      ) : (
        <TableView
          props={{
            transactions: onlyTrans,
            setTransaction: setOnlyTrans,
            pagesTransaction: pageTransactions,
            banks: banks,
            departments: departments,
            staffs: staff,
            donors: donor,
          }}
        />
      )}
    </Space>
  )
}

export default TransactionPage
