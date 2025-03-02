import { Link } from 'react-router-dom';
import '@styles/components/layout-page/sidebar-menu-group.scss';

const SidebarMenuGroup = ({ menus }) => {
  return (
    <ul className='list'>
      {menus.map((menu) => (
        <li key={menu.id}>
          <Link to={menu.path} className='menu'>
            <span className='menu__item menu__item--icon'>{menu.icon}</span>
            <span className='menu__item menu__item--name'>{menu.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SidebarMenuGroup;
