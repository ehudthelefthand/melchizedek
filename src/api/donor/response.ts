export interface DonorListResponse {
  id: number
  prefix: string
  fullName: string
  nickName: string
  type: string
  staff: string
  note: string
}

export interface PageDonorResponse {
  data: DonorListResponse[]
  page: number
  totalPage: number
  totalItems: number
  itemPerPage: number
}
