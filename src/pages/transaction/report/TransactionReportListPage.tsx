import Table, { ColumnType } from 'antd/es/table'

import { DownloadOutlined } from '@ant-design/icons'
import { TransactionReportResponse } from '../../../api/transaction/response/report'
import { STATUS } from '../../../constants/api'
import { ProcessStatus } from '../components/ServerStatusComponent'
import useTransactionReport from './useTransactionReport'
import { Skeleton } from 'antd'

function TransactionReportListPage() {
  const transactionReport = useTransactionReport()
  const {
    reportList,
    isLoading,
    handleTableChange,
    getFile,
    pagination,
    totalItems,
  } = transactionReport

  // TODO: translations แปลภาษา
  // const [t] = useTranslation('translation')

  const columns: ColumnType<TransactionReportResponse>[] = [
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
        <DownloadOutlined onClick={() => getFile(res.fileName)} />
      ),
      width: 10,
      align: 'left',
    },
  ]

  if (isLoading) {
    return <Skeleton active={isLoading} />
  }

  return (
    <>
    {reportList.length > 0 ? (
      <Table
        loading={isLoading}
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={reportList}
        pagination={{
          pageSize: pagination.itemsPerPage,
          current: pagination.current,
          total: totalItems,
          showSizeChanger: true,
          pageSizeOptions: [20,40,80,100],
        }}
        onChange={handleTableChange}
        />
    ) : (
      <p>No data</p>
    )}
    </>
  )
}

export default TransactionReportListPage
