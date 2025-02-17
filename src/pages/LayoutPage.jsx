import { Outlet } from 'react-router-dom';

const LayoutPage = () => {
  return (
    <div className='layout-page'>
      <header></header>
      <main className='layout-page__main'>
        <Outlet />
      </main>
      <footer></footer>
    </div>
  );
};

export default LayoutPage;
