import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfWeek,
  endOfWeek,
  isToday,
} from "date-fns";
import { ar } from "date-fns/locale";
import { DateClickArg } from "@fullcalendar/interaction/index.js";
import { TFirstDayOfWeek } from "@/types/shared";
import MiniCalendar from "./mini-calendar/MiniCalendar";
import "./Sidebar.css";
import { TEvent } from "../Calendar";

type TSidebarProps = {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  firstDayOfWeek: TFirstDayOfWeek;
  clickedEvent: DateClickArg | null;
  events: TEvent[];
};

const Sidebar = ({
  currentDate,
  onDateChange,
  firstDayOfWeek,
  clickedEvent,
  events,
}: TSidebarProps) => {
  const getDaysInMonth = (date: Date) => {
    const start = startOfWeek(startOfMonth(date), {
      weekStartsOn: firstDayOfWeek,
    });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: firstDayOfWeek });
    return eachDayOfInterval({ start, end });
  };

  return (
    <div className="calender_sidebar">
      <MiniCalendar
        currentDate={currentDate}
        firstDayOfWeek={1}
        onDateChange={onDateChange}
        getDaysInMonth={getDaysInMonth}
      />
      <div className="daily-schedule">
        {events.map((event) => {
          const eventDate = new Date(event.start);
          if (clickedEvent && isSameDay(eventDate, clickedEvent.date) || isToday(eventDate)) {
            return (
              <div key={event.title} className="event">
                <div className="time">
                  <span>
                    {format(new Date(event.start), "hh:mm a", { locale: ar })}
                  </span>
                  -
                  {event.end && (
                    <span>
                      {format(new Date(event.end), "hh:mm a", { locale: ar })}
                    </span>
                  )}
                </div>
                <div>{event.title}</div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Sidebar;
