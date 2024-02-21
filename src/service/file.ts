import { UploadFile } from 'antd'
import { excelExtensions } from '../constants/extension'

export const getFileExtension = (file: UploadFile<any>) =>
  file.name.split('.').pop()?.toLowerCase()

export const isExcelFile = (file: UploadFile<any>) => {
  const fileExtension = getFileExtension(file)
  return excelExtensions.includes(`.${fileExtension}`)
}
