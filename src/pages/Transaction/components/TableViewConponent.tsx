import { Modal, Space, Table, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { PageTransactionAPI } from '../../../api/transactionapi'
import { useNavigate } from 'react-router-dom'
import { Key, useEffect, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'
import { BankAPI, DepartmentAPI, DonorAPI, StaffAPI } from '../../../api/models'
import { TransactionForm, TransactionLists } from '../../../model/model'
import dayjs from 'dayjs'
import API from '../../../api'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

interface Props {
  transactions: TransactionLists[]
  setTransactions: React.Dispatch<React.SetStateAction<TransactionLists[]>>
  pagesTransaction: PageTransactionAPI | undefined
  banks: BankAPI[]
  departments: DepartmentAPI[]
  staffs: StaffAPI[]
  donors: DonorAPI[]
}

const TableViewComponent: React.FC<{ props: Props }> = ({ props }) => {
  const [t] = useTranslation('translation')
  const navigate = useNavigate()

  const { transactions, pagesTransaction, banks, departments, staffs } = props
  const toBank = banks.filter((bank) => bank.id <= 4)

  const transactionFormated: TransactionLists[] = transactions.map(
    (transac: TransactionLists) => {
      const result: TransactionLists = {
        ...transac,
        transferDate: dayjs(transac.transferDate).format('DD/MM/YYYY HH:mm:ss'),
        createAt: dayjs(transac.createAt).format('DD/MM/YYYY HH:mm:ss'),
      }
      return result
    }
  )

  const [tableParams, _] = useState<TableParams>({
    pagination: {
      current: pagesTransaction?.page,
      pageSize: pagesTransaction?.itemPerPage,
    },
  })

  const onEdit = (transaction: TransactionForm) => {
    navigate(`/transaction/edit/${transaction.id}`)
  }

  const onDelete = (transaction: TransactionForm) => {
    Modal.confirm({
      title: `${t('transacMessage.confirmDelete')}`,
      centered: true,
      width: 400,
      onOk() {
        API.deleteTransactionByID(transaction.id!)
          .then(() => {
            message.success(`${t('transacMessage.deleteSuccess')}`)
            window.location.reload()
          })
          .catch(() => {
            message.error(`${t('transacMessage.deleteFail')}`)
          })
      },
    })
  }

  const columns: ColumnsType<TransactionLists> = [
    {
      title: '#',
      width: 60,
      dataIndex: 'id',
      key: 'id',
      fixed: 'left',
      align: 'center',
      sorter: (a, b) => a.id - b.id,
      sortDirections: ['ascend'],
    },
    {
      title: t('transacList.createAt'),
      width: 140,
      dataIndex: 'createAt',
      key: 'createAt',
      align: 'left',
    },
    {
      title: t('transacList.donorName'),
      width: 150,
      dataIndex: 'donorName',
      key: 'donorName',
      align: 'left',
      sorter: (a, b) => a.donorName.length - b.donorName.length,
      sortDirections: ['descend'],
    },
    {
      title: t('transacList.amount'),
      dataIndex: 'amount',
      key: 'amount',
      width: 150,
      align: 'left',
    },
    {
      title: t('transacList.dateTransfers'),
      dataIndex: 'transferDate',
      key: 'transferDate',
      width: 140,
      align: 'left',
    },
    {
      title: t('transacList.fromBank'),
      dataIndex: 'fromBank',
      key: 'fromBank',
      width: 150,
      align: 'left',
      filters: banks.map((bank) => ({ text: bank.code, value: bank.code })),
      onFilter: (fromBank: boolean | Key, record: TransactionLists) =>
        record.fromBank === fromBank,
    },
    {
      title: t('transacList.toBank'),
      dataIndex: 'toBank',
      key: 'toBank',
      width: 150,
      align: 'left',
      filters: toBank.map((bank) => ({ text: bank.code, value: bank.code })),
      onFilter: (toBank: boolean | Key, record: TransactionLists) =>
        record.toBank === toBank,
    },
    {
      title: t('transacList.staffName'),
      width: 150,
      dataIndex: 'staffName',
      key: 'staffName',
      align: 'left',
      filters: staffs.map((staff) => ({
        text: staff.fullName,
        value: staff.fullName,
      })),
      onFilter: (staffName: boolean | Key, record: TransactionLists) =>
        record.staffName === staffName,
    },
    {
      title: t('transacList.department'),
      dataIndex: 'department',
      key: 'department',
      width: 80,
      align: 'center',
      filters: departments.map((department) => ({
        text: department.name,
        value: department.name,
      })),
      onFilter: (department: boolean | Key, record: TransactionLists) =>
        record.department === department,
    },
    {
      title: t('transacList.slip'),
      dataIndex: 'slip',
      key: 'slip',
      width: 100,
      align: 'center',
    },
    {
      title: t('transacList.event'),
      dataIndex: 'event',
      key: 'event',
      width: 100,
      align: 'center',
    },
    {
      title: t('transacList.descriptions'),
      dataIndex: 'descriptions',
      key: 'descriptions',
      width: 120,
      align: 'center',
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (transaction: TransactionForm) => (
        <Space size={'large'} key={transaction.id}>
          <EditOutlined
            onClick={() => onEdit(transaction)}
            style={{ cursor: 'pointer', color: '#2196F3', fontSize: 20 }}
          />
          <DeleteOutlined
            onClick={() => onDelete(transaction)}
            style={{ cursor: 'pointer', color: '#a9a9a9', fontSize: 20 }}
          />
        </Space>
      ),
    },
  ]

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={transactionFormated}
        scroll={{ x: 0 }}
        sticky={{ offsetHeader: 0 }}
        pagination={tableParams.pagination}
      />
    </>
  )
}

export default TableViewComponent
