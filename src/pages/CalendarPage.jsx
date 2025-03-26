import { useParams } from 'react-router-dom';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useEffect, useState, useCallback } from 'react';
import '@styles/pages/calendar-page.scss';
import { useGetTeamSchedule, useUpdateSchedule } from '@hooks/schedule/useSchedule';
import { getMonthQueryString } from '@utils/getMonthQueryString';
import { formatCalendarEvents } from '@utils/formatCalendarEvents';

const CalendarPage = () => {
  const { queryString: initialQueryString } = getMonthQueryString();
  const [queryString, setQueryString] = useState(initialQueryString);
  const [events, setEvents] = useState([]);

  const { teamId } = useParams();
  const { data } = useGetTeamSchedule(teamId, queryString);
  const { mutate: updateSchedule } = useUpdateSchedule();

  const handleEventDrop = (info) => {
    const schedule = info.event.extendedProps;

    const formatDate = (date) => date.toISOString().split('T')[0];

    const editedStartDate = formatDate(info.event.start);
    const edittedEndDate = info.event.end ? formatDate(info.event.end) : editedStartDate;

    const editedSchedule = {
      ...schedule,
      startDate: editedStartDate,
      endDate: edittedEndDate,
      users: schedule.users.map((user) => user.userId),
    };

    updateSchedule(editedSchedule);
  };

  const handleDatesSet = useCallback((info) => {
    const formatDate = (date) => date.toISOString().split('T')[0];

    const updatedStartDate = formatDate(info.start);
    const updatedEndDate = formatDate(info.end);

    const newQueryString = `startDate=${updatedStartDate}&endDate=${updatedEndDate}`;

    setQueryString(newQueryString);
  }, []);

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
      headerToolbar={{
        left: 'dayGridMonth,dayGridWeek',
        right: 'prev,next today',
      }}
      datesSet={handleDatesSet}
    />
  );
};

export default CalendarPage;
