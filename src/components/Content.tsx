import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'

const { Content } = Layout

const AppContent: React.FC = () => {
  return (
    <>
      <Content
        style={{
          margin: '6px 16px',
        }}
      >
        <div
          style={{
            padding: 10,
            background: 'white',
            boxShadow: '2px 2px 10px #21212130',
            borderRadius: 7,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </>
  )
}

export default AppContent
