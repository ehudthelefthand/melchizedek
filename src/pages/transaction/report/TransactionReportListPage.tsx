import Table, { ColumnType } from 'antd/es/table'

import { DownloadOutlined } from '@ant-design/icons'
import { TransactionReportResponse } from '../../../api/transaction/response/report'
import { STATUS } from '../../../constants/api'
import { ProcessStatus } from '../components/ServerStatusComponent'
import useTransactionReport from './useTransactionReport'

function TransactionReportListPage() {
  const transactionReport = useTransactionReport()
  const { reportList, isLoading, handleTableChange, tableParams, getFile } =
    transactionReport

  // const [t] = useTranslation('translation')

  const columns: ColumnType<TransactionReportResponse>[] = [
    // TODO: translations แปลภาษา
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

  return (
    <Table
      loading={isLoading}
      columns={columns}
      rowKey={(record) => record.id}
      dataSource={reportList}
      pagination={tableParams.pagination}
      onChange={handleTableChange}
    />
  )
}

export default TransactionReportListPage
