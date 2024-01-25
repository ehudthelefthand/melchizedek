import './App.css'
import React from 'react'
import AppRoutes from './routes/AppRoutes'
import { ConfigProvider } from 'antd'
import { ServiceContext, useCreateService } from './service/service'

export const App: React.FC = () => {
  const service = useCreateService()
  if (service.isLoading) {
    return <div>กำลังโหลด...</div>
  }
  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg: '#f5f5f5',
          },
          Form: {
            itemMarginBottom: 0,
          },
          Button: {
            colorPrimary: '#00A9FF',
          },
        },
        token: {
          fontFamily: 'Kanit',
        },
      }}
    >
      <ServiceContext.Provider value={service}>
        <AppRoutes />
      </ServiceContext.Provider>
    </ConfigProvider>
  )
}

export default App
