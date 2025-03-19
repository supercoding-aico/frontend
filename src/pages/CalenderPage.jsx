import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useTeamSchedule } from '@hooks/schedule/useSchedule';

const CalendarPage = () => {
  const location = useLocation();

  const [events, setEvents] = useState([]);

  const match = location.pathname.match(/\/team\/(\d+)\/calendar/);
  const teamId = match ? match[1] : null;

  const { data } = useTeamSchedule(teamId);

  useEffect(() => {
    if (data) {
      setEvents(data);
    }
  }, [data]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={events}
      dateClick={(info) => alert(`날짜 클릭: ${info.dateStr}`)}
    />
  );
};

export default CalendarPage;
