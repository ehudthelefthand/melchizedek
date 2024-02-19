import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons"
import { Layout } from "antd"
import { useState } from "react"
import SideMenu from "../components/SideMenu"
import MzkHeader from "../components/Header"
import AppContent from "../components/Content"

const { Sider } = Layout

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
