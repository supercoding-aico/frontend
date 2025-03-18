import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from 'react';

const CalendarPage = () => {
  const [events, setEvents] = useState([
    { id: '1', title: '회의', date: '2025-03-20' },
    { id: '2', title: '프로젝트 마감', date: '2025-03-25' },
  ]);

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
