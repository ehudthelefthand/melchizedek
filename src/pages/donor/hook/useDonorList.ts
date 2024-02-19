import { useEffect, useState } from 'react'
import { DonorListResponse } from '../../../api/donor/response'
import { TableProps } from 'antd'
import { initialPagination } from '../../../constants/api'

const useDonorList = () => {
  // const service = useService()
  const [donorList, _setDonorList] = useState<DonorListResponse[]>([])
  const [pagination, setPagination] = useState({
    current: initialPagination.currentPage,
    itemsPerPage: initialPagination.itemsPerPage,
  })
  const [totalItems, _setTotalItems] = useState(initialPagination.totalItems)
  const [isLoading, _setIsloading] = useState(false)

  const handleTableChange: TableProps<DonorListResponse>['onChange'] = (
    pagination
  ) => {
    setPagination({
      current: pagination.current ?? initialPagination.currentPage,
      itemsPerPage: pagination.pageSize ?? initialPagination.itemsPerPage,
    })
  }

  useEffect(() => {
    // service.api.donor
    //   .getAll({
    //     currentPage: pagination.current,
    //     itemsPerPage: pagination.itemsPerPage,
    //   })
    //   .then((response) => {
    //     setTotalItems(response.totalItems)
    //     setDonorList(response.data)
    //   })
    //   .catch((err) => console.error(err))
    //   .finally(() => setIsloading(false))
  }, [pagination])

  return {
    donorList,
    isLoading,
    pagination,
    totalItems,
    handleTableChange,
  }
}

export default useDonorList
