import { TablePaginationConfig } from 'antd'

export interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: string
  sortOrder?: string
}
