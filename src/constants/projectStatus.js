export const PROJECT_STATUS_ENUM = Object.freeze({
  BEFORE: 'BEFORE',
  WIP: 'WIP',
  DONE: 'DONE',
});

export const PROJECT_STATUS = [
  {
    id: PROJECT_STATUS_ENUM.BEFORE,
    name: '시작 전',
    emoji: '✨',
  },
  {
    id: PROJECT_STATUS_ENUM.WIP,
    name: '작업 중',
    emoji: '🔥',
  },
  {
    id: PROJECT_STATUS_ENUM.DONE,
    name: '완료',
    emoji: '✅',
  },
];
