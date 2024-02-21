import { UploadOutlined } from '@ant-design/icons'
import { Button, Upload, UploadFile, UploadProps, Typography } from 'antd'
import { MouseEventHandler, useEffect } from 'react'
import { getFileExtension, isExcelFile } from '../service/file'

function UploadFileExcel({
  props,
  error,
  handleUpload,
  file,
  setError,
}: {
  error?: string
  setError: Function
  props: UploadProps<any>
  handleUpload: MouseEventHandler<HTMLElement>
  file: UploadFile<any>
}) {
  useEffect(() => {
    if (file) {
      if (!isExcelFile(file)) {
        setError(
          `Wrong file format, require .xlsx file format but found ".${getFileExtension(
            file
          )}"`
        )
      } else {
        setError('')
      }
    }
  }, [file])

  return (
    <>
      <Upload {...props} maxCount={1}>
        <Button
          style={{
            flexDirection: 'row',
          }}
        >
          <UploadOutlined /> Click to Upload
        </Button>
      </Upload>
      {error && <Typography style={{ color: 'red' }}>{error}</Typography>}
      <Button
        type="primary"
        onClick={handleUpload}
        disabled={!file || error != ''}
        style={{ marginTop: 16 }}
      >
        Upload File
      </Button>
    </>
  )
}

export default UploadFileExcel
