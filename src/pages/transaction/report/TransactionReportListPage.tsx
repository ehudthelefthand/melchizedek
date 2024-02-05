import Table, {
  ColumnType,
  TablePaginationConfig,
  TableProps,
} from 'antd/es/table'
import { useEffect, useState } from 'react'

import { GetProp, Skeleton, Spin, message } from 'antd'
import { DownloadOutlined, LoadingOutlined } from '@ant-design/icons'
import {
  PageTransactionReportResponse,
  TransactionReportResponse,
} from '../../../api/transaction/response/report'
import { useService } from '../../../service/service'
import { STATUS } from '../../../constants/api'
import { ProcessStatus } from '../components/ServerStatusComponent'

// const data: TransactionReportResponse[] = [
//   {
//     id: 1,
//     fileName: 'eiei',
//     status: STATUS.success,
//   },
//   {
//     id: 2,
//     fileName: 'huhu',
//     status: STATUS.processing,
//   },
//   {
//     id: 3,
//     fileName: 'hehe',
//     status: STATUS.error,
//   },
// ]

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

function TransactionReportListPage() {
  const [pagination, setPagination] = useState<PageTransactionReportResponse>()
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: pagination?.page,
      pageSize: pagination?.itemPerPage,
    },
  })

  const [report, setTransactionReport] = useState<TransactionReportResponse[]>(
    []
  )
  // const [t] = useTranslation('translation')
  const service = useService()
  const [isLoading, setIsloading] = useState(false)

  useEffect(() => {
    // TODO: Test API Report
    service.api.transaction
      .getReports(service.reactStore.store)
      .then((response) => {
        setPagination(response)
        setTransactionReport(response.data)
      })
      .catch((err) => {
        console.error(err)
        message.error(`Database connection is lost!, Please try again.`)
      })
      .finally(() => setIsloading(false))
  }, [])

  const handleTableChange: TableProps<TransactionReportResponse>['onChange'] = (
    pagination,
    filters,
    sorter
  ) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    })
  }

  const columns: ColumnType<TransactionReportResponse>[] = [
    // TODO: translations
    {
      title: '#',
      key: 'id',
      dataIndex: 'id',
      width: 10,
      align: 'center',
    },
    {
      title: 'FileName',
      key: 'fileName',
      dataIndex: 'fileName',
      width: 10,
      align: 'left',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: STATUS) => ProcessStatus(status),
      width: 10,
      align: 'center',
    },
    {
      title: '',
      key: 'dowload',
      render: (res: TransactionReportResponse) => (
        <DownloadOutlined
          onClick={() => {
            console.log(`res: ${res.fileName}`)
            // getLinkReport(res)
            // service.api.transaction.getLinkReport(service.reactStore.store, url)
          }}
        />
      ),
      width: 10,
      align: 'left',
    },
  ]

  return isLoading ? (
    <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}>
      <Skeleton active />
    </Spin>
  ) : (
    <Table
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={report}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
    />
  )
}

export default TransactionReportListPage
