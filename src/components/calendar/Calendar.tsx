import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";

import Sidebar from "./sideBar/SideBar";

import "./calendar.css";
import { useState, useRef } from "react";
import { EventContentArg } from "@fullcalendar/core/index.js";
import { useAppSelector } from "@/store/hooks";

export type TEvent = {
  id: number;
  title: string;
  start: string;
  end: string;
  description: string;
  location: string;
  status: string;
  employee: string;
  timeZone: string;
}

const Calendar = ({ events }: { events: TEvent[]}) => {

  const { students } = useAppSelector(state => state.lessons)
  let studentsNames: string[];
  if (students) {
    studentsNames = Array.from(Object.keys(students))
  }

  const calendarRef = useRef<FullCalendar>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [clickedEvent, setClickedEvent] = useState<DateClickArg | null>(null);

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date);
    }
  };

  const customArLocale = {
    ...arLocale,
    buttonText: {
      today: "اليوم",
      month: "شهر",
      week: "أسبوع",
      day: "يوم",
    },
  };

  const renderEventContent = (eventContent: EventContentArg) => {
    const { event, timeText, view } = eventContent;
    if (view.type === 'dayGridMonth') {
      return event.title
    }

    return (
      <>
        <h4>{students && students[0].student_name}</h4>
        <span>{timeText}</span>
        <p>{event.title}</p>
      </>
    );
  }

  return (
    <div className="calendar_container">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventContent={renderEventContent}
        eventClick={(info) => {
          console.log(info);
        }}
        eventClassNames={"my-custom-event"}
        dateClick={(info) => {
          setCurrentDate(info.date)
          setClickedEvent(info)
        }}
        locale={customArLocale}
        direction="rtl"
        headerToolbar={{
          center: "title",
          left: "prev,next today",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"auto"}
        selectMirror={true}
        ref={calendarRef}
      />
      <Sidebar
        currentDate={currentDate}
        onDateChange={handleDateChange}
        firstDayOfWeek={1}
        clickedEvent={clickedEvent}
        events={events}
      />
    </div>
  );
};

export default Calendar;
