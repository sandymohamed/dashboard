import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";

import Sidebar from "./sideBar/SideBar";

import "./calendar.css";
import { useState, useRef } from "react";
import { isSameDay } from "date-fns";
import { DayCellContentArg, EventContentArg } from "@fullcalendar/core/index.js";

const Calendar = () => {
  const calendarRef = useRef<FullCalendar>(null);

  const events = [
    { title: "Meeting", start: new Date(), allDay: true },
    { title: "test-event", start: "2024-07-22T10:00", end: "2024-07-22T12:00", className: 'my-custom-event', textColor: "#FAA15D"  },
    { title: "test-event-blbabal bla", start: "2024-07-22T10:00", end: "2024-07-22T12:00", textColor: "#FAA15D"  },
    { title: "Conference", start: new Date(), allDay: true, className: 'my-custom-event', textColor: "#FAA15D" },
  ];

  const [currentDate, setCurrentDate] = useState(new Date());

  const handleDateChange = (date: Date) => {
    setCurrentDate(date);
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(date);
    }
  };

  const dayCellClassNames = (arg: DayCellContentArg) => {
    if (isSameDay(arg.date, currentDate)) {
      return "selected-day";
    }
    return "";
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
    console.log(eventContent);
    return (
      <>
        <b>{eventContent.timeText}</b>
        <br />
        <i>{eventContent.event.title}</i>
      </>
    )
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
        dateClick={(info) => setCurrentDate(info.date)}
        locale={customArLocale}
        direction="rtl"
        headerToolbar={{
          center: "title",
          left: "prev,next today",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"auto"}
        selectMirror={true}
        dayCellClassNames={dayCellClassNames}
        ref={calendarRef}
      />
      <Sidebar
        currentDate={currentDate}
        onDateChange={handleDateChange}
        firstDayOfWeek={1}
      />
    </div>
  );
};

export default Calendar;
