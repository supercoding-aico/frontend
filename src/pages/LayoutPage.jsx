import { Outlet } from 'react-router-dom';
import '@styles/pages/layout-page.scss';
import Sidebar from '@components/layout-page/Sidebar';

const LayoutPage = () => {
  // TODO: 모바일 반응형 추가
  return (
    <div className='layout-page'>
      <aside className='layout-page__aside'>
        <Sidebar />
      </aside>
      <main className='layout-page__main'>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPage;
