import { PageTransactionReportResponse } from './../../../api/transaction/response/report'
import { useEffect, useState } from 'react'
import { TransactionReportResponse } from '../../../api/transaction/response/report'
import { useService } from '../../../service/service'
import { GetProp, TablePaginationConfig, TableProps, message } from 'antd'
import { initialPagination } from '../../../constants/api'

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const useTransactionReport = () => {
  const [reportList, setReportList] = useState<TransactionReportResponse[]>([])
  const [pagination, setPagination] = useState<PageTransactionReportResponse>()
  const [isLoading, setIsloading] = useState(true)
  const [currentPage, setCurrentPage] = useState(initialPagination.currentPage)
  const [itemsPerPage, setItemPerPage] = useState(
    initialPagination.itemsPerPage
  )
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: pagination?.page,
      pageSize: pagination?.itemPerPage,
      total: pagination?.totalItems,
    },
  })

  const service = useService()

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

  //   const data: TransactionReportResponse[] = [
  //     {
  //       id: 1,
  //       fileName: 'eiei',
  //       status: STATUS.success,
  //     },
  //     {
  //       id: 2,
  //       fileName: 'huhu',
  //       status: STATUS.processing,
  //     },
  //     {
  //       id: 3,
  //       fileName: 'hehe',
  //       status: STATUS.error,
  //     },
  //   ]

  useEffect(() => {
    service.api.transaction
      .getReports(service.reactStore.store, { currentPage, itemsPerPage })
      .then((response) => {
        response
        setPagination(response)
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
  }, [])

  const getFile = (fileName: string) => {
    service.api.transaction.getLinkReport(fileName).then((response : any) => {
      response
      console.log("res",response)
    })
    console.log("fileName",fileName)
  }

  return {
    reportList,
    pagination,
    isLoading,
    handleTableChange,
    tableParams,
    getFile,
  }
}

export default useTransactionReport
