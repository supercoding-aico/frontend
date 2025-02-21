import { Outlet } from 'react-router-dom';
import '@styles/pages/layout-page.scss';

const LayoutPage = () => {
  return (
    <div className='layout'>
      <aside className='layout--aside'></aside>
      <main className='layout--main'>
        <Outlet />
      </main>
    </div>
  );
};

export default LayoutPage;
