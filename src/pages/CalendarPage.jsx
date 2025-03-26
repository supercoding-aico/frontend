import { useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState } from 'react';
import '@styles/pages/calendar-page.scss';
import { useGetTeamSchedule, useUpdateSchedule } from '@hooks/schedule/useSchedule';
import { getMonthQueryString } from '@utils/getMonthQueryString';
import { formatCalendarEvents } from '@utils/formatCalendarEvents';

const CalendarPage = () => {
  const [events, setEvents] = useState([]);
  const { teamId } = useParams();
  const { queryString } = getMonthQueryString();
  const { data } = useGetTeamSchedule(teamId, queryString);
  const { mutate: updateSchedule } = useUpdateSchedule();

  const handleEventDrop = (info) => {
    const schedule = info.event.extendedProps;

    const formatDate = (date) => date.toISOString().split('T')[0];

    const updatedStartDate = formatDate(info.event.start);
    const updatedEndDate = info.event.end ? formatDate(info.event.end) : updatedStartDate;

    const updatedSchedule = {
      ...schedule,
      startDate: updatedStartDate,
      endDate: updatedEndDate,
      users: schedule.users.map((user) => user.userId),
    };

    updateSchedule(updatedSchedule);
  };

  useEffect(() => {
    if (data?.data) {
      const formattedEvents = formatCalendarEvents(data?.data);
      setEvents(formattedEvents);
    }
  }, [data]);

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView='dayGridMonth'
      events={events}
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
