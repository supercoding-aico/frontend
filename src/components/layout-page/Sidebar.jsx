import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { Bell } from 'react-feather';
import { useState, useMemo } from 'react';
import '@styles/components/layout-page/sidebar.scss';
import SidebarMenuGroup from '@components/layout-page/SidebarMenuGroup';
import SidebarDropdown from '@components/layout-page/SidebarDropdown';
import ProfileModal from '@components/layout-page/ProfileModal';
import EmptyState from '@components/common/EmptyState';
import { getTeamList } from '@api/teamApi';
import { SIDEBAR_MENU_HOME, SIDEBAR_MENU_TEAM, SIDEBAR_MENU_USER } from '@constants/sidebarMenu';
import placeholder from '@assets/images/profile-placeholder.png';
import useNewMessage from '@hooks/chat/useNewMessage';

const Sidebar = ({ handleNotificationClick, alertCount }) => {
  const user = useSelector((state) => state.user.userInfo);
  const latestTeamId = useSelector((state) => state.team.latestTeam.teamId);

  const [hasNewMessage, setHasNewMessage] = useState(false);

  useNewMessage(user?.userId, setHasNewMessage);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  // TODO: hook으로 분리
  const { data } = useQuery({
    queryKey: ['teamList'],
    queryFn: getTeamList,
  });

  const teamList = useMemo(() => data?.data?.content, [data]);

  /* 팀 메뉴 path에 id params 추가 */
  const updatedTeamMenu = useMemo(() => {
    if (!latestTeamId) return SIDEBAR_MENU_TEAM;

    return SIDEBAR_MENU_TEAM.map((menu) => ({
      ...menu,
      path: `/team/${latestTeamId}${menu.path}`,
      hasNewMessage: menu.id === 'chatting' ? hasNewMessage : undefined, // ✅ 여기서만 표시
    }));
  }, [latestTeamId, hasNewMessage]);

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
      <nav className='sidebar'>
        {/* Menu Header */}
        <header className='header'>
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
          <div className='notification'>
            <button onClick={handleNotificationClick}>
              <Bell />
            </button>
            {alertCount > 0 && <span className='notification__count'>{alertCount}</span>}
          </div>
        </header>

        {/* Menu Group 1 - HOME */}
        <SidebarMenuGroup menus={SIDEBAR_MENU_HOME} />

        {/* Menu Group 2 - TEAM */}
        <h2 className='sidebar__subtitle'>팀스페이스</h2>
        {teamList && teamList.length > 0 ? (
          <>
            <SidebarDropdown teams={teamList} />
            <SidebarMenuGroup menus={updatedTeamMenu} />
          </>
        ) : (
          <EmptyState message='가입한 팀이 없습니다' />
        )}

        {/* Menu Group 3 - USER */}
        <h2 className='sidebar__subtitle'>마이스페이스</h2>
        <SidebarMenuGroup menus={SIDEBAR_MENU_USER} onMenuClick={handleMenuClick} />
      </nav>

      {isProfileModalOpen && <ProfileModal closeProfileModal={closeProfileModal} />}
    </>
  );
};

export default Sidebar;
