import { Link } from 'react-router-dom';
import '@styles/components/layout-page/sidebar-menu-group.scss';

const SidebarMenuGroup = ({ menus, onMenuClick = undefined }) => {
  return (
    <ul className='list'>
      {menus.map((menu) => {
        if (!menu.path) {
          return (
            <li key={menu.id}>
              <button className='menu' onClick={() => onMenuClick(menu.id)}>
                <span className='menu__item menu__item--icon'>{menu.icon}</span>
                <span className='menu__item menu__item--name'>{menu.name}</span>
              </button>
            </li>
          );
        }
        return (
          <li key={menu.id}>
            <Link to={menu.path} className='menu'>
              <span className='menu__item menu__item--icon'>{menu.icon}</span>
              <span className='menu__item menu__item--name'>{menu.name}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenuGroup;
