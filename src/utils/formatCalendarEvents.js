// TODO: 포맷팅 수정
// Event 속성
// {
//   title: '팀 회의',
//   start: '2025-03-20T10:00:00',
//   end: '2025-03-20T12:00:00',
//   description: '매주 팀 회의',
//   backgroundColor: '#ff5733',
//   borderColor: '#ff5733',
//   textColor: '#ffffff',
//   classNames: ['meeting-class'],
//   editable: true,
//   url: 'https://example.com',
//   extendedProps: {
//     projectId: 101,
//     priority: 'high',
//   },
// }
export const formatCalendarEvents = (events) => {
  return events.map((event) => {
    return {
      ...event,
      start: new Date(event.start),
      end: new Date(event.end),
    };
  });
};
