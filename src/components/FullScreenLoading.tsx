import { Spin } from 'antd';

const FullScreenLoading = ({ spinning }: {spinning: boolean}) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, zIndex: 9999, display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.5)' }}>
      <Spin spinning={spinning} size="large" />
    </div>
  );
};

export default FullScreenLoading;
