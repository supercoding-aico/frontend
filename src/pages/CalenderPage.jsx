import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import { useTeamId } from '@hooks/useTeamId';
import { useGetTeamSchedule } from '@hooks/schedule/useSchedule';
import { getMonthQueryString } from '@utils/getMonthQueryString';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const teamId = useTeamId();
  const { queryString } = getMonthQueryString();

  const { data } = useGetTeamSchedule(teamId, queryString, {
    onSuccess: () => {
      setEvents(data.data);
    },
  });

  const handleEventDrop = (info) => {
    const updatedEvent = {
      ...info.event,
      start: info.event.start,
      end: info.event.end,
    };
    // TODO: 서버에 업데이트
  };

  console.log('events', events);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={events}
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
