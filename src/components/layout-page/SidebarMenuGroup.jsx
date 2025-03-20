import { Link } from 'react-router-dom';
import '@styles/components/layout-page/sidebar-menu-group.scss';
import { useChat } from '@hooks/chat/useChat';

const SidebarMenuGroup = ({ menus, onMenuClick = undefined, TeamId, userId }) => {
  const { isActive } = useChat(TeamId, userId);
  return (
    <ul className='list'>
      {menus.map((menu) => {
        const isChatMenu = menu.id === 'chatting';
        if (!menu.path) {
          return (
            <li key={menu.id}>
              <button className='menu' onClick={() => onMenuClick(menu.id)}>
                <span className='menu__item menu__item--icon'>{menu.icon}</span>
                <span className='menu__item menu__item--name'>{menu.name}</span>
                {isChatMenu && (
                  <span className={isActive ? 'status-dot active' : 'status-dot'}></span>
                )}
              </button>
            </li>
          );
        }
        return (
          <li key={menu.id}>
            <Link to={menu.path} className='menu'>
              <span className='menu__item menu__item--icon'>{menu.icon}</span>
              <span className='menu__item menu__item--name'>{menu.name}</span>
              {isChatMenu && (
                <span className={isActive ? 'status-dot active' : 'status-dot'}></span>
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SidebarMenuGroup;
