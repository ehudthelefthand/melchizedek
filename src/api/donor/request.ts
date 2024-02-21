export interface DonorCreateRequest {
  prefix: string
  fullName: string
  type: string
  staff: string
}

export interface DonorSearchRequest {
  fullName: string
}
