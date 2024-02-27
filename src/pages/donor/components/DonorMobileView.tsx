import { List, Skeleton } from "antd"
import { PageResponse } from "../../../constants/api"
import { DonorListResponse } from "../../../api/donor/response"

function DonorMobileView(
   {
      donorItems,
      donorList,
      isLoading,
      pagination,
      totalItems,
      handlePageChange,
   }: {
      donorItems: any
      donorList: DonorListResponse[] | []
      isLoading: boolean
      pagination: PageResponse
      totalItems: number
      handlePageChange: (page: number) => void
   }
) {
   return isLoading ? (
      <Skeleton active />
   ) : (
      <List
         grid={{
            gutter: [10, 10],
            xs: 1,
            sm: 1,
            md: 2,
         }}
         itemLayout='vertical'
         loading={isLoading}
         renderItem={donorItems}
         dataSource={donorList}
         pagination={{
            current: pagination.current,
            pageSize: pagination.itemsPerPage,
            total: totalItems,
            onChange: handlePageChange,
         }}
      />
   )
}

export default DonorMobileView