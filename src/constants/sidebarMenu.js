import { Home, Calendar, Folder, MessageCircle, Settings, User, List } from 'react-feather';

export const SIDEBAR_MENU_HOME = [
  {
    id: 'home',
    name: '홈',
    path: '/',
    icon: <Home />,
  },
];

export const SIDEBAR_MENU_TEAM = [
  {
    id: 'calendar',
    name: '캘린더',
    path: '/calendar',
    icon: <Calendar />,
  },
  {
    id: 'project',
    name: '프로젝트',
    path: '/project',
    icon: <Folder />,
  },
  {
    id: 'chatting',
    name: '채팅',
    path: '/chatting',
    icon: <MessageCircle />,
  },
  {
    id: 'setting',
    name: '관리',
    path: '/setting',
    icon: <Settings />,
  },
];

export const SIDEBAR_MENU_USER = [
  {
    id: 'profile',
    name: '프로필',
    icon: <User />,
  },
  {
    id: 'userTeam',
    name: '나의 팀 목록',
    path: '/team',
    icon: <List />,
  },
];
