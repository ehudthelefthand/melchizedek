import { Modal, Space, Table, message } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import {
  PageTransaction,
  ToStringTransaction,
  TransactionAPI,
} from '../../../api/transactionapi'
import { useNavigate } from 'react-router-dom'
import API from '../../../api'
import { useEffect, useState } from 'react'
import { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue } from 'antd/es/table/interface'
import { Banks, Department, Donor, Staff } from '../../../api/models'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Record<string, FilterValue>
}

interface Props {
  transactions: ToStringTransaction[]
  setTransaction: React.Dispatch<React.SetStateAction<any[]>>
  pagesTransaction: PageTransaction | undefined
  banks: Banks[]
  departments: Department[]
  staffs: Staff[]
  donors: Donor[]
}

const TableViewComponent: React.FC<{ props: Props }> = ({ props }) => {
  const [t] = useTranslation('translation')
  const navigate = useNavigate()

  const {
    transactions,
    pagesTransaction,
    banks,
    departments,
    staffs,
  } = props

  const toBank = banks.filter((bank) => bank.id <= 3)

  const [tableParams, _] = useState<TableParams>({
    pagination: {
      current: pagesTransaction?.data.page,
      pageSize: pagesTransaction?.data.itemPerPage,
    },
  })

  const onEdit = (record: TransactionAPI) => {
    console.log('record', record)
    navigate(`/transaction/edit/${record.id}`, {
      state: { isEdit: true },
    })
    console.log('edit page:', record)
  }

  const onDelete = (record: TransactionAPI) => {
    Modal.confirm({
      title: `${t('transacMessage.confirmDelete')}`,
      centered: true,
      width: 400,
      onOk() {
        try {
          console.log('delete success')
          message.success(`${t('transacMessage.deleteSuccess')}`)
          API.deleteTransactionByID(record.id)
          setTimeout(() => {
            window.location.reload()
          }, 500)
        } catch (err) {
          console.log(err)
        }
      },
    })
  }

  const columns: ColumnsType<ToStringTransaction> = [
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
      width: 150,
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
      width: 150,
      align: 'left',
    },
    {
      title: t('transacList.fromBank'),
      dataIndex: 'fromBank',
      key: 'fromBank',
      width: 150,
      align: 'left',
      filters: banks.map((bank) => ({ text: bank.code, value: bank.code })),
      onFilter: (value: any, record: ToStringTransaction) =>
        record.toBank === value,
    },
    {
      title: t('transacList.toBank'),
      dataIndex: 'toBank',
      key: 'toBank',
      width: 150,
      align: 'left',
      filters: toBank.map((bank) => ({ text: bank.code, value: bank.code })),
      onFilter: (value: any, record: ToStringTransaction) =>
        record.toBank === value,
    },
    {
      title: t('transacList.staffName'),
      width: 150,
      dataIndex: 'staffName',
      key: 'staffName',
      align: 'left',
      filters: staffs.map((staff) => ({
        text: staff.fullname,
        value: staff.fullname,
      })),
      onFilter: (value: any, record: ToStringTransaction) =>
        record.staffName === value,
    },
    {
      title: t('transacList.department'),
      dataIndex: 'department',
      key: 'department',
      width: 120,
      align: 'center',
      filters: departments.map((department) => ({
        text: department.name,
        value: department.name,
      })),
      onFilter: (value: any, record: ToStringTransaction) =>
        record.department === value,
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
      width: 100,
      align: 'center',
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (value: TransactionAPI) => (
        <Space size={'large'} key={value.id}>
          <EditOutlined
            onClick={() => onEdit(value)}
            style={{ cursor: 'pointer', color: '#2196F3', fontSize: 20 }}
          />
          <DeleteOutlined
            onClick={() => onDelete(value)}
            style={{ cursor: 'pointer', color: '#a9a9a9', fontSize: 20 }}
          />
        </Space>
      ),
    },
  ]

  useEffect(() => {
    transactions.map((transaction) => {
      console.log('each item in table', transaction)
    })
  }, [])

  return (
    <>
      <Table
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={transactions}
        scroll={{ x: 0 }}
        sticky={{ offsetHeader: 0 }}
        pagination={tableParams.pagination}
      />
    </>
  )
}

export default TableViewComponent
