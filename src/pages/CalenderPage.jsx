import { useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import '@styles/pages/calendar-page.scss';
import { useGetTeamSchedule } from '@hooks/schedule/useSchedule';
import { getMonthQueryString } from '@utils/getMonthQueryString';
import { formatCalendarEvents } from '@utils/\bformatCalendarEvents';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const { teamId } = useParams();
  const { queryString } = getMonthQueryString();
  const { data } = useGetTeamSchedule(teamId, queryString);

  const handleEventDrop = (info) => {
    const updatedEvent = {
      ...info.event,
      start: info.event.start,
      end: info.event.end,
    };
    // TODO: 서버에 업데이트
  };

  //   {
  //     "scheduleId": 15,
  //     "content": "test1",
  //     "status": "BEFORE",
  //     "startDate": "2025-03-21",
  //     "endDate": "2025-03-23",
  //     "users": []
  // }

  // {
  //   title: '팀 회의',
  //   start: '2025-03-20T10:00:00',
  //   end: '2025-03-20T12:00:00',
  //   description: '매주 팀 회의',
  //   backgroundColor: '#ff5733',
  //   borderColor: '#ff5733',
  // },

  useEffect(() => {
    if (data?.data) {
      const formattedEvents = formatCalendarEvents(data?.data);
      setEvents(formattedEvents);
    }
  }, [data]);

  // console.log('events', events);

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
