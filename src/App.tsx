import './App.css'
import React, { useState } from 'react'
import SideMenu from './components/SideMenu'
import AppContent from './components/Content'
import AppRoutes from './routes/AppRoutes'

import { ConfigProvider, Layout } from 'antd'
import MzkHeader from './components/Header'
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { ServiceContext, useCreateService } from './service/service'

const { Sider } = Layout

export const App: React.FC = () => {
  const abc = useCreateService()

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
      <ServiceContext.Provider value={abc}>
        <AppRoutes />
      </ServiceContext.Provider>
    </ConfigProvider>
  )
}

export const DashboardLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Layout style={{ minHeight: '100%' }}>
      <Sider
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          zIndex: 4,
          boxShadow: '0px 0px 5px #21212145',
        }}
        theme="light"
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        trigger={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      >
        <SideMenu />
      </Sider>
      <Layout className={`app-content ${collapsed ? 'collapsed' : ''}`}>
        <MzkHeader />
        <AppContent />
      </Layout>
    </Layout>
  )
}

export default App
