import { ColumnType } from 'antd/es/table'
import { DonorListResponse } from '../../../api/donor/response'
import { DonorResponse } from '../../../api/metadatum/response'
import { DeleteOutlined } from '@ant-design/icons'
import { Modal, Space } from 'antd'
import { useTranslation } from 'react-i18next'

export const useAntdDonorTableData = ({ onDelete }: { onDelete: any }) => {
  const [t] = useTranslation('translation')
  const donorColumns: ColumnType<DonorListResponse>[] = [
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
      title: '',
      key: 'action',
      fixed: 'right',
      width: 100,
      align: 'center',
      render: (donorResponse: DonorResponse) => (
        <Space size={'large'} key={donorResponse.id}>
          {/* <EditOutlined
              onClick={() => onEdit(donorResponse.id)}
              style={{ cursor: 'pointer', color: '#2196F3', fontSize: 20 }}
            /> */}
          <DeleteOutlined
            onClick={() =>
              Modal.confirm({
                title: `${t('transacMessage.confirmDelete')}`,
                centered: true,
                width: 400,
                onOk() {
                  onDelete(donorResponse.id)
                },
              })
            }
            style={{ cursor: 'pointer', color: '#a9a9a9', fontSize: 20 }}
          />
        </Space>
      ),
    },
  ]

  return { donorColumns }
}

export default useAntdDonorTableData
