import {
  Flex,
  Image,
  Modal,
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

const baseURL = import.meta.env.VITE_REACT_PUBLIC_CORE_API

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}

function TransactionTableView(
  props: PropsWithChildren<{
    transactions: TransactionList[]
    pagesTransaction: PageTransactionResponse | undefined
    currentPage: number
    setCurrentPage: React.Dispatch<React.SetStateAction<any>>
    itemsPerPage: number
    setItemsPerPage: React.Dispatch<React.SetStateAction<any>>
  }>
) {
  const [t] = useTranslation('translation')
  const navigate = useNavigate()
  const service = useService()
  const { Text } = Typography

  const {
    transactions,
    pagesTransaction,
    currentPage,
    itemsPerPage,
    setCurrentPage,
    setItemsPerPage,
  } = props
  const [isLoading, setIsLoading] = useState(true)

  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: currentPage,
      pageSize: itemsPerPage,
      total: pagesTransaction?.totalItems,
      showSizeChanger: true,
      pageSizeOptions: [20, 40, 60, 100],
    },
  })

  const handleTableChange: TableProps<TransactionList>['onChange'] = (
    pagination,
    sorter
  ) => {
    setCurrentPage(pagination.current)
    setItemsPerPage(pagination.pageSize)
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
        text: staff.nickName,
        value: staff.nickName,
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
      dataIndex: 'images',
      key: 'images',
      width: 150,
      align: 'center',
      render: (imagesName: string[]) => {
        return imagesName.length > 0 ? (
          <>
            {imagesName.map((imageName) => (
              <Image
                key={imageName}
                width={50}
                height={50}
                src={`${baseURL}/image/${imageName}`}
              />
            ))}
          </>
        ) : (
          <p>-</p>
        )
      },
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

export default TransactionTableView
