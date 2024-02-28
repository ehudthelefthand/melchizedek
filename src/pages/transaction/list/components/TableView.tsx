import {
  Checkbox,
  Flex,
  Image,
  Skeleton,
  Space,
  Spin,
  Table,
  Typography,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import { Key, PropsWithChildren } from 'react'
import { ColumnsType, TableProps } from 'antd/es/table'
import dayjs from 'dayjs'
import { TotalOfferingsList, TransactionList } from '../model/transaction'
import { useService } from '../../../../service/service'
import { PageResponse } from '../../../../constants/api'

const baseURL = import.meta.env.VITE_REACT_PUBLIC_CORE_API

function TransactionTableView(
  props: PropsWithChildren<{
    isLoading: boolean
    transactionsList: TransactionList[]
    onEdit: Function
    onDelete: Function
    selectedItems: number[]
    onSelected: Function
    pagination: PageResponse
    totalItems: number
    handleTableChange: TableProps<TransactionList>['onChange']
  }>
) {
  const [t] = useTranslation('translation')

  const service = useService()
  const { Text } = Typography

  const {
    transactionsList,
    onEdit,
    onDelete,
    selectedItems,
    onSelected,
    isLoading,
    pagination,
    totalItems,
    handleTableChange,
  } = props

  const columns: ColumnsType<TransactionList> = [
    {
      title: selectedItems.length > 0 && (
        <DeleteOutlined
          style={{ color: 'red' }}
          onClick={() => onDelete(selectedItems)}
        />
      ),
      width: 70,
      key: 'id',
      fixed: 'left',
      align: 'center',
      render: (transaction: TransactionList) => (
        <Checkbox onChange={() => onSelected(transaction.id)} />
      ),
    },
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
      title: t('transacList.bank'),
      dataIndex: 'bankCode',
      key: 'fromBankCode',
      width: 150,
      align: 'left',
    },
    {
      title: t('transacList.yfcBank'),
      dataIndex: 'yfcBankCode',
      key: 'yfcBankCode',
      width: 150,
      align: 'left',
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
      width: 110,
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
            onClick={() => onDelete([transaction.id])}
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
          dataSource={transactionsList}
          scroll={{ x: 0 }}
          sticky={{ offsetHeader: 0 }}
          pagination={{
            pageSize: pagination.itemsPerPage,
            current: pagination.current,
            total: totalItems,
            showSizeChanger: true,
            pageSizeOptions: [2, 10, 20, 40, 80, 100],
          }}
          onChange={handleTableChange}
        />
      )}
    </>
  )
}

export default TransactionTableView
