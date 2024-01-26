import {
  Flex,
  Image,
  Modal,
  Row,
  Skeleton,
  Space,
  Spin,
  Table,
  Typography,
  message,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { Key, PropsWithChildren, useEffect, useState } from 'react'
import { ColumnsType, TablePaginationConfig, TableProps } from 'antd/es/table'
// import type { FilterValue } from 'antd/es/table/interface'
import dayjs from 'dayjs'
import { PageTransactionResponse } from '../../../../api/transaction/response/transaction'
import { TotalOfferingsList, TransactionList } from '../model/transaction'
import { useService } from '../../../../service/service'
import Column from 'antd/es/table/Column'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}

function TableView(
  props: PropsWithChildren<{
    transactions: TransactionList[]
    pagesTransaction: PageTransactionResponse | undefined
  }>
) {
  const [t] = useTranslation('translation')
  const navigate = useNavigate()
  const service = useService()
  const { Text } = Typography

  const { transactions, pagesTransaction } = props
  const [isLoading, setIsLoading] = useState(true)

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: pagesTransaction?.page,
      pageSize: pagesTransaction?.itemPerPage,
    },
  })

  const handleTableChange: TableProps<TransactionList>['onChange'] = (
    pagination,
    sorter
  ) => {
    setTableParams({
      pagination,
      ...sorter,
    })
  }

  useEffect(() => {
    setIsLoading(false)
  }, [tableParams])

  const onEdit = (transaction: TransactionList) => {
    navigate(`/transaction/edit/${transaction.id}`)
  }

  const onDelete = (transaction: TransactionList) => {
    Modal.confirm({
      title: `${t('transacMessage.confirmDelete')}`,
      centered: true,
      width: 400,
      onOk() {
        service.api.transaction
          .delete(transaction.id)
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

  const columns: ColumnsType<TransactionList> = [
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
      render: (value: dayjs.Dayjs) => value.format('DD/MM/YYYY HH:mm:ss'),
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
      render: (value: dayjs.Dayjs) => value.format('DD/MM/YYYY HH:mm:ss'),
    },
    {
      title: t('transacList.fromBank'),
      dataIndex: 'fromBankCode',
      key: 'fromBankCode',
      width: 150,
      align: 'left',
      filters: service.metadatums
        .getAllBanks()
        .map((bank) => ({ text: bank.code, value: bank.code })),
      onFilter: (fromBankCode: boolean | Key, record: TransactionList) =>
        record.fromBankCode === fromBankCode,
    },
    {
      title: t('transacList.toBank'),
      dataIndex: 'toBankCode',
      key: 'toBankCode',
      width: 150,
      align: 'left',
      filters: service.metadatums
        .getMZKBanks()
        .map((bank) => ({ text: bank.code, value: bank.code })),
      onFilter: (toBankCode: boolean | Key, record: TransactionList) =>
        record.toBankCode === toBankCode,
    },
    {
      title: t('transacList.staffName'),
      width: 150,
      dataIndex: 'staffName',
      key: 'staffName',
      align: 'left',
      filters: service.metadatums.getAllStaffs().map((staff) => ({
        text: staff.fullName,
        value: staff.fullName,
      })),
      onFilter: (staffName: boolean | Key, record: TransactionList) =>
        record.staffName === staffName,
    },
    {
      title: t('transacList.department'),
      dataIndex: 'departmentName',
      key: 'departmentName',
      width: 80,
      align: 'center',
      filters: service.metadatums.getAllDepartments().map((department) => ({
        text: department.name,
        value: department.name,
      })),
      onFilter: (departmentName: boolean | Key, record: TransactionList) =>
        record.departmentName === departmentName,
    },
    {
      title: t('transacList.slip'),
      dataIndex: 'slip',
      key: 'slip',
      width: 100,
      align: 'center',
      render: (value: string) =>
        value !== null && value !== '' ? (
          <Image
            width={60}
            height={50}
            src={'error'}
            fallback="data:image/png;base64,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"
          />
        ) : (
          <></>
        ),
    },
    {
      title: t('transacList.event'),
      dataIndex: 'totalOfferings',
      key: 'totalOfferings',
      width: 100,
      align: 'left',
      render: (value: TotalOfferingsList) => (
        <Flex vertical>
          {value.sumFixOfferings !== 0 && (
            <Text>FIX: {value.sumFixOfferings}</Text>
          )}
          {value.sumGiftOfferings !== 0 && (
            <Text>GIFT: {value.sumGiftOfferings}</Text>
          )}
          {value.sumProjectOfferings !== 0 && (
            <Text>PROJECT: {value.sumProjectOfferings}</Text>
          )}
          {value.sumFixOfferings === 0 &&
            value.sumGiftOfferings === 0 &&
            value.sumProjectOfferings === 0 && <Text> - </Text>}
        </Flex>
      ),
    },
    {
      title: t('transacList.descriptions'),
      dataIndex: 'descriptions',
      key: 'descriptions',
      width: 120,
      align: 'center',
      render: (value: string) =>
        value !== null && value !== '' ? value : <Text> - </Text>,
    },
    {
      title: '',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (transaction: TransactionList) => (
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
      {isLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
          <Skeleton active />
        </Spin>
      ) : (
        <Table
          columns={columns}
          rowKey={(record) => record.id}
          dataSource={transactions}
          scroll={{ x: 0 }}
          sticky={{ offsetHeader: 0 }}
          pagination={tableParams.pagination}
          onChange={handleTableChange}
        />
      )}
    </>
  )
}

export default TableView
