import { SelectProps } from 'antd'

export enum STATUS {
  success = 'success',
  processing = 'processing',
  error = 'error',
}

export interface PageRequest {
  currentPage: number
  itemsPerPage: number
}

export const initialPagination = {
  currentPage: 1,
  itemsPerPage: 20,
  totalItems: 0,
}

export const initialRegion: SelectProps['options'] = [
  { label: 'BK', value: 'BK' },
  { label: 'CM', value: 'CM' },
  { label: 'CR', value: 'CR' },
]
