import { Bell, Menu } from 'react-feather';
import '@styles/components/layout-page/sidebar.scss';
import SidebarMenuGroup from '@components/layout-page/SidebarMenuGroup';
import {
  SIDEBAR_MENU_HOME as homeMenu,
  SIDEBAR_MENU_TEAM as teamMenu,
  SIDEBAR_MENU_USER as userMenu,
} from '@constants/sidebarMenu';
import placeholder from '@assets/images/profile-placeholder.png';

const Sidebar = () => {
  return (
    <section className='sidebar'>
      {/* Menu Header */}
      <div className='header'>
        <div className='profile'>
          <img src={placeholder} alt='사용자 프로필 사진' className='profile__img' />
          <div className='profile__info'>
            <span className='profile__info--nickname'>nickname</span>
            <span className='profile__info--email'>test@test.com</span>
          </div>
        </div>
        <div className='buttons'>
          <button className='buttons__icon buttons--notification'>
            <Bell />
          </button>
          <button className='buttons__icon buttons--menu'>
            <Menu />
          </button>
        </div>
      </div>

      {/* Menu Group 1 */}
      <SidebarMenuGroup menus={homeMenu} />

      {/* Menu Group 2 */}
      <h2 className='sidebar__subtitle'>팀스페이스</h2>
      <div>드롭다운</div>
      <SidebarMenuGroup menus={teamMenu} />

      {/* Menu Group 3 */}
      <h2 className='sidebar__subtitle'>마이스페이스</h2>
      <SidebarMenuGroup menus={userMenu} />
    </section>
  );
};

export default Sidebar;
