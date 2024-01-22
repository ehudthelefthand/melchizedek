import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useMediaQuery } from 'react-responsive'
import dayjs from 'dayjs'
import { Input, Space, Button, Row, Col } from 'antd'
import MobileViewComponent from './components/MobileView'
import API from '../../../api'
import {
  PageTransactionResponse,
  TransactionResponse,
} from '../../../api/response/transaction'
import { TransactionLists } from '../model/transaction'
import { Bank, Department, Donor, Staff } from '../../../api/metadatums'
import { TransactionFixOfferingList } from '../model/fixOffering'
import { TransactionGiftOfferingList } from '../model/giftOffering'
import { TransactionProjectOfferingList } from '../model/projectOffering'
import TableView from './components/TableView'

const { Search } = Input

const TransactionPage: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const [t] = useTranslation('translation')
  const [pageTransactions, setPageTransactions] =
    useState<PageTransactionResponse>()
  const [transactions, setTransactions] = useState<TransactionLists[]>([])

  // Metadatums
  const [banks, setBanks] = useState<Bank[]>([])
  const [departments, setDepartments] = useState<Department[]>([])
  const [staffs, setStaffs] = useState<Staff[]>([])
  const [donors, setDonors] = useState<Donor[]>([])

  useEffect(() => {
    API.getTranactions()
      .then((pageTransaction) => {
        const transactionFormattedData: TransactionLists[] =
          pageTransaction.data.map((transaction: TransactionResponse) => {
            const result: TransactionLists = {
              ...transaction,
              createAt: dayjs(transaction.createAt),
              transferDate: dayjs(transaction.transferDate),
              amount: transaction.amount.toLocaleString('th-TH', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              }),
              fixOfferings: transaction.fixOfferings.map((fixOffering) => {
                const fix: TransactionFixOfferingList = {
                  ...fixOffering,
                  startMonth: dayjs(fixOffering.startMonth),
                  dueMonth: dayjs(fixOffering.startMonth),
                }
                return fix
              }),
              giftOfferings: transaction.giftOfferings.map((giftOffering) => {
                const gift: TransactionGiftOfferingList = {
                  ...giftOffering,
                  transferDate: dayjs(giftOffering.transferDate),
                }
                return gift
              }),
              projectOfferings: transaction.projectOfferings.map(
                (projectOffering) => {
                  const project: TransactionProjectOfferingList = {
                    ...projectOffering,
                    startDate: dayjs(projectOffering.startDate),
                    dueDate: dayjs(projectOffering.dueDate),
                  }
                  return project
                }
              ),
            }
            return result
          })

        setPageTransactions(pageTransaction)
        setTransactions(transactionFormattedData)
      })
      .catch((error: any) => {
        console.error('TransactionPage', error)
      })

    API.getMetadatum()
      .then((metadatums) => {
        setBanks(metadatums.banks)
        setDepartments(metadatums.departments)
        setStaffs(metadatums.staffs)
        setDonors(metadatums.donors)
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
          <Link to={'/transaction/create'}>
            <Button size="large" type="primary" className="btn-primary">
              {t('transacButton.addData')}
            </Button>
          </Link>
        </Col>
      </Row>
      {isMobile ? (
        <MobileViewComponent transactions={transactions} />
      ) : (
        <TableView
          transactions={transactions}
          setTransactions={setTransactions}
          pagesTransaction={pageTransactions}
          banks={banks}
          departments={departments}
          staffs={staffs}
          donors={donors}
        />
      )}
    </Space>
  )
}

export default TransactionPage
