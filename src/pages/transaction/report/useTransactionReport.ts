import { useEffect, useState } from 'react'
import { TransactionReportResponse } from '../../../api/transaction/response/report'
import { useService } from '../../../service/service'
import { TableProps, message } from 'antd'
import { initialPagination } from '../../../constants/api'

const useTransactionReport = () => {
  const [reportList, setReportList] = useState<TransactionReportResponse[]>([])
  const [isLoading, setIsloading] = useState(true)
  const [pagination, setPagination] = useState({
    current: initialPagination.currentPage,
    itemsPerPage: initialPagination.itemsPerPage,
  })
  const [totalItems, setTotalItems] = useState(initialPagination.totalItems)

  const service = useService()

  const handleTableChange: TableProps<TransactionReportResponse>['onChange'] = (
    pagination
  ) => {
    setPagination({
      current: pagination.current ?? initialPagination.currentPage,
      itemsPerPage: pagination.pageSize ?? initialPagination.itemsPerPage,
    })
  }

  useEffect(() => {
    service.api.transaction
      .getReports(service.reactStore.store, {
        currentPage: pagination.current,
        itemsPerPage: pagination.itemsPerPage,
      })
      .then((response) => {
        setTotalItems(response.totalItems)
        setReportList(response.data)
      })
      .catch((err) => {
        console.error(err),
          message.error(
            'Error report in Database connection is lost!, Please try again.'
          )
      })
      .finally(() => {
        setIsloading(false)
      })
  }, [pagination])

  const getFile = async (fileName: string) =>
    service.api.transaction
      .getLinkReport(fileName)
      .then((response: any) => response)

  return {
    reportList,
    pagination,
    totalItems,
    isLoading,
    handleTableChange,
    getFile,
  }
}

export default useTransactionReport
