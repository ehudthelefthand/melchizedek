import { Skeleton, Table } from 'antd'
import { ColumnType } from 'antd/es/table'
import useDonorList from '../hook/useDonorList'
import { DonorListResponse } from '../../../api/donor/response'

function UserTableView() {
  const donor = useDonorList()
  const { donorList, isLoading, handleTableChange, pagination, totalItems } =
    donor

  // TODO: แปลภาษา
  const columns: ColumnType<DonorListResponse>[] = [
    {
      title: '#',
      key: 'id',
      dataIndex: 'id',
      width: 10,
      align: 'center',
    },
    {
      title: 'คำนำหน้า',
      key: 'prefix',
      dataIndex: 'prefix',
      width: 10,
      align: 'left',
    },
    {
      title: 'ชื่อจริง',
      key: 'fullname',
      dataIndex: 'fullName',
      width: 20,
      align: 'left',
    },
    {
      title: 'ชื่อเล่น',
      key: 'nickName',
      dataIndex: 'nickName',
      width: 20,
      align: 'left',
    },
    {
      title: 'ประเภท',
      key: 'type',
      dataIndex: 'type',
      width: 20,
      align: 'left',
    },
    {
      title: 'ผู้ดูแล',
      key: 'staff',
      dataIndex: 'staff',
      width: 20,
      align: 'left',
    },
    {
      title: 'note',
      key: 'note',
      dataIndex: 'note',
      width: 20,
      align: 'left',
    },
  ]

  if (isLoading) {
    return <Skeleton active />
  }

  return (
    <Table
      loading={isLoading}
      columns={columns}
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

export default UserTableView
