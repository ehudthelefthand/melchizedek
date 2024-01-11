import React from 'react'
import { Layout, Select } from 'antd'
import { useTranslation } from 'react-i18next'

const { Header } = Layout
const { Option } = Select

const items = [
  {
    label: 'TH',
    key: 'th',
  },
  {
    label: 'EN',
    key: 'en',
  },
]

const MzkHeader: React.FC = () => {
  const [t, i18n] = useTranslation('translation')

  const onHandle = (e: string) => {
    i18n.changeLanguage(e)
  }

  ;<style>.ant-layout-header</style>

  return (
    <Header
      style={{
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        background: 'white',
        padding: 16,
      }}
    >
      <Select
        defaultValue={i18n.language}
        style={{ width: 70 }}
        onChange={onHandle}
      >
        {items.map((option) => (
          <Option key={option.key} value={option.key}>
            {t(option.label)}
          </Option>
        ))}
      </Select>
    </Header>
  )
}

export default MzkHeader
