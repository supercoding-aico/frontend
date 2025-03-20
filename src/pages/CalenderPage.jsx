import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import useTeamId from '@hooks/useTeamId';
import { useTeamSchedule } from '@hooks/schedule/useSchedule';

const CalendarPage = () => {
  const location = useLocation();
  const teamId = useTeamId();

  const [events, setEvents] = useState([]);

  const { data } = useTeamSchedule(teamId);

  const mockData = [
    {
      title: '팀 회의',
      start: '2025-03-20T10:00:00',
      end: '2025-03-20T12:00:00',
      description: '매주 팀 회의',
      backgroundColor: '#ff5733',
      borderColor: '#ff5733',
    },
    {
      title: '프로젝트 데드라인',
      start: '2025-03-22T15:00:00',
      end: '2025-03-22T17:00:00',
      description: '중요 프로젝트 제출 마감',
      backgroundColor: '#33c7ff',
      borderColor: '#33c7ff',
    },
    {
      title: '팀 워크샵',
      start: '2025-03-25T09:00:00',
      end: '2025-03-26T11:00:00',
      description: '팀 빌딩을 위한 워크샵',
      backgroundColor: '#4CAF50',
      borderColor: '#4CAF50',
    },
    {
      title: '휴가',
      start: '2025-03-27T00:00:00',
      end: '2025-03-28T00:00:00',
      description: '개인 휴가',
      backgroundColor: '#f39c12',
      borderColor: '#f39c12',
    },
    {
      title: '팀 발표',
      start: '2025-03-30T14:00:00',
      end: '2025-03-30T16:00:00',
      description: '프로젝트 발표 준비',
      backgroundColor: '#9b59b6',
      borderColor: '#9b59b6',
    },
  ];

  const handleEventDrop = (info) => {
    const updatedEvent = {
      ...info.event,
      start: info.event.start,
      end: info.event.end,
    };
    // TODO: 서버에 업데이트
  };

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={mockData}
      dateClick={(info) => alert(`날짜 클릭: ${info.dateStr}`)}
      eventTimeFormat={{
        hour: '2-digit',
        minute: '2-digit',
        meridiem: false,
      }}
      eventDrop={handleEventDrop}
      editable={true}
    />
  );
};

export default CalendarPage;
