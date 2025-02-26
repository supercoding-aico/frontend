import { Outlet } from 'react-router-dom';
import '@styles/pages/layout-page.scss';

const LayoutPage = () => {
  return (
    <div className='layout-page'>
      <aside className='layout-page__aside'></aside>
      <main className='layout-page__main'>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPage;
