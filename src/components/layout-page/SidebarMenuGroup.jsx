import { Link } from 'react-router-dom';

const SidebarMenuGroup = ({ menus }) => {
  return (
    <div>
      <ul>
        {menus.map((menu) => (
          <li key={menu.id}>
            <Link to={menu.path}>{menu.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarMenuGroup;
