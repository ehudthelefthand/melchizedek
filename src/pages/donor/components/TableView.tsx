import { Skeleton, Table } from 'antd'

import { ColumnsType, TableProps } from 'antd/es/table'
import { DonorListResponse } from '../../../api/donor/response'
import { PageResponse } from '../../../constants/api'

function DonorTableView({
  data,
  donorList,
  isLoading,
  handleTableChange,
  pagination,
  totalItems,
}: {
  data: ColumnsType<DonorListResponse> | undefined
  donorList: DonorListResponse[] | []
  isLoading: boolean
  handleTableChange: TableProps<DonorListResponse>['onChange']
  pagination: PageResponse
  totalItems: number
}) {
  return isLoading ? (
    <Skeleton active />
  ) : (
    <Table
      loading={isLoading}
      columns={data}
      rowKey={(record) => record.id}
      dataSource={donorList}
      pagination={{
        pageSize: pagination.itemsPerPage,
        current: pagination.current,
        total: totalItems,
        showSizeChanger: true,
        pageSizeOptions: [20, 40, 80, 100],
      }}
      onChange={handleTableChange}
    />
  )
}

export default DonorTableView
