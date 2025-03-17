import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Bell, Menu } from 'react-feather';
import { useState, useMemo } from 'react';
import '@styles/components/layout-page/sidebar.scss';
import SidebarMenuGroup from '@components/layout-page/SidebarMenuGroup';
import SidebarDropdown from '@components/layout-page/SidebarDropdown';
import ProfileModal from '@components/layout-page/ProfileModal';
import { getTeamList } from '@api/teamApi';
import {
  SIDEBAR_MENU_HOME as homeMenu,
  SIDEBAR_MENU_TEAM as teamMenu,
  SIDEBAR_MENU_USER as userMenu,
} from '@constants/sidebarMenu';
import placeholder from '@assets/images/profile-placeholder.png';

const Sidebar = () => {
  const user = useSelector((state) => state.user.userInfo);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // TODO: hook으로 분리
  const { data } = useQuery({
    queryKey: ['teamList'],
    queryFn: getTeamList,
  });

  const teamList = useMemo(() => data?.data?.content, [data]) ?? [];

  const handleMenuClick = (menuId) => {
    if (menuId === 'profile') {
      setIsProfileModalOpen(true);
    }
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  return (
    <>
      <section className='sidebar'>
        {/* Menu Header */}
        <div className='header'>
          <div className='profile'>
            <img
              src={user.imageUrl ?? placeholder}
              alt='사용자 프로필 사진'
              className='profile__img'
            />
            <div className='profile__info'>
              <span className='profile__info--nickname'>{user.nickname}</span>
              <span className='profile__info--email'>{user.email}</span>
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
        <SidebarDropdown teams={teamList} />
        <SidebarMenuGroup menus={teamMenu} />

        {/* Menu Group 3 */}
        <h2 className='sidebar__subtitle'>마이스페이스</h2>
        <SidebarMenuGroup menus={userMenu} onMenuClick={handleMenuClick} />
      </section>

      {isProfileModalOpen && <ProfileModal closeProfileModal={closeProfileModal} />}
    </>
  );
};

export default Sidebar;
