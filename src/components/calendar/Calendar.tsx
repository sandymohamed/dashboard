import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import arLocale from "@fullcalendar/core/locales/ar";

import Sidebar from "./sideBar/SideBar";

import "./calendar.css";
import { useState, useRef, useCallback, useMemo } from "react";
import {
  EventContentArg,
  EventInput,
  EventSourceInput,
} from "@fullcalendar/core/index.js";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetLessons from "@/store/lessons/act/actGetLessons";
import { TLesson } from "@/validations/LessonSchema";
import actGetLessonsByRange from "@/store/lessons/act/actGetLessonsByRange";

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
};

const Calendar = () => {
  const dispatch = useAppDispatch();

  const { students, lessons } = useAppSelector((state) => state.lessons);
  console.log('students', students);

  const { user } = useAppSelector((state) => state.auth);

  const calendarRef = useRef<FullCalendar>(null);

  const [currentDate, setCurrentDate] = useState(new Date());

  const [clickedEvent, setClickedEvent] = useState<DateClickArg | null>(null);

  const [currentEvents, setCurrentEvents] = useState<TEvent[] | null>(null);
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
    if (view.type === "dayGridMonth") {
      return event.title;
    }

    return (
      <>
        {/* <h4>{students && students[0].student_name}</h4> */}
        <span>{timeText}</span>
        <p>{event.title}</p>
      </>
    );
  };

  // const loadMoreEvents =  (startStr: Date, endStr: Date) => {
  //   const start = startStr.toISOString().split('T')[0];
  //   const end = endStr.toISOString().split('T')[0];
  // //   if (!user?.token) return
  // //  dispatch(actGetLessonsByRange({token: user?.token, start_date: start, end_date: end}))
  // }

  // const events = lessons?.map(event => ({
  //   id: event.id,
  //   title: event.service_name,
  //   start: event.from_datetime,
  //   end: event.to_datetime,
  //   description: event.description,
  //   location: event.location_name,
  //   status: event.status,
  //   employee: event.employee_name,
  //   timeZone: event.time_zone
  // }));

  // const fetchEvents = useCallback(async (start: Date, end: Date, successCallback) => {
  //   // Convert start and end to your API's required format
  //   const startStr = start.toISOString().split('T')[0];
  //   const endStr = end.toISOString().split('T')[0];

  //   if (!user?.token) return
  //     // Dispatch your action to fetch lessons
  //     // You might need to modify your action to accept start and end dates
  //   dispatch(actGetLessonsByRange({token: user?.token, start_date: startStr, end_date: endStr})).unwrap().then(() => {

  //     const newEvents = lessons.map(event => ({
  //       id: event.id,
  //       title: event.service_name,
  //       start: event.from_datetime,
  //       end: event.to_datetime,
  //       description: event.description,
  //       location: event.location_name,
  //       status: event.status,
  //       employee: event.employee_name,
  //       timeZone: event.time_zone
  //     }));

  //     successCallback(newEvents);
  //   });

  //   // Map lessons to FullCalendar event format

  //   // Update events state
  //   // setEvents(prevEvents => [...prevEvents, ...newEvents]);

  //   // Call the success callback with the new events
  // }, [dispatch, user?.token, lessons]);

  // Create a memoized version of the events array
  // const events = useMemo(() => {
  //   return lessons.map((event) => ({
  //     id: event.id,
  //     title: event.service_name,
  //     start: event.from_datetime,
  //     end: event.to_datetime,
  //     description: event.description,
  //     location: event.location_name,
  //     status: event.status,
  //     employee: event.employee_name,
  //     timeZone: event.time_zone,
  //   }));
  // }, [lessons]);

  const fetchEvents = useCallback(
    async (
      info: { start: Date; end: Date },
      successCallback: (events: TEvent[]) => void
    ) => {
      const startStr = info.start.toISOString().split("T")[0];
      const endStr = info.end.toISOString().split("T")[0];

      const events = lessons.map((event) => ({
        id: event.id,
        title: event.service_name,
        start: event.from_datetime,
        end: event.to_datetime,
        description: event.description,
        location: event.location_name,
        status: event.status,
        employee: event.employee_name,
        timeZone: event.time_zone,
        backgroundColor: 'red'
      }));

      setCurrentEvents(events);
      console.log("calendar events", events);

      if (!user?.token) return;

      // Check if we already have events for this date range
      const hasEventsInRange = events.some(
        (event) =>
          new Date(event.start) >= info.start && new Date(event.end) <= info.end
      );

      if (!hasEventsInRange) {
        try {
          await dispatch(
            actGetLessonsByRange({
              token: user?.token,
              start_date: startStr,
              end_date: endStr,
            })
          ).unwrap();
        } catch (error) {
          console.error("Error fetching events:", error);
        }
      }

      const eventsInRange = events.filter(
        (event) =>
          new Date(event.start) >= info.start && new Date(event.end) <= info.end
      );

      successCallback(eventsInRange);
    },
    [dispatch, user?.token]
  );

  return (
    <div className="calendar_container">
      <div className="calendar_container">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          eventContent={renderEventContent}
          eventClassNames={"my-custom-event"}
          locale={customArLocale}
          direction="rtl"
          headerToolbar={{
            center: "title",
            left: "prev,next today",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          height={"auto"}
          events={fetchEvents}
          ref={calendarRef}
          dateClick={(info) => {
            setCurrentDate(info.date);
            setClickedEvent(info);
          }}
        />
      </div>
      {/* <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        eventContent={renderEventContent}
        eventClassNames={"my-custom-event"}
        // dateClick={(info) => {
        //   setCurrentDate(info.date)
        //   setClickedEvent(info)
        // }}
        locale={customArLocale}
        direction="rtl"
        headerToolbar={{
          center: "title",
          left: "prev,next today loadMore",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"auto"}
        // selectMirror={true}
        // ref={calendarRef}
        // datesSet={(dateInfo) => {
        //   loadMoreEvents(dateInfo.start, dateInfo.end);
        // }}
        eventSources={[
          {
            events: (info, successCallback, failureCallback) => 
              fetchEvents(info.start, info.end, successCallback),
          }
        ]} */}
      {/* // customButtons={{ */}
      {/* //   loadMore: { */}
      {/* //     text: 'Load More', */}
      {/* //     click: loadMoreEvents */}
      {/* //   } */}
      {/* // }} */}
      {/* // /> */}
      <Sidebar
        currentDate={currentDate}
        onDateChange={handleDateChange}
        firstDayOfWeek={1}
        clickedEvent={clickedEvent}
        events={currentEvents}
      />
    </div>
  );
};

export default Calendar;
