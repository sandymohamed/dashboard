import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ar } from "date-fns/locale";
import { TFirstDayOfWeek } from "@/types/shared";
import MiniCalendar from "./mini-calendar/MiniCalendar";
import "./Sidebar.css";
import { useContext } from "react";
import { SidebarContext } from "@/store/context/SidebarContext";
import { useResponsive } from "@/hooks";
import { PH_calendarIcon, PH_teacherIcon } from "@/assets/nav-icons";
import Clock from "@/assets/grayClock.svg?react";
import formatDaysAndMonths from "@/utils/formatDaysAndMonths";
import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes";

type TSidebarProps = {
  firstDayOfWeek: TFirstDayOfWeek;
};

const Sidebar = ({ firstDayOfWeek }: TSidebarProps) => {
  const getDaysInMonth = (date: Date) => {
    const start = startOfWeek(startOfMonth(date), {
      weekStartsOn: firstDayOfWeek,
    });

    const end = endOfWeek(endOfMonth(date), { weekStartsOn: firstDayOfWeek });
    return eachDayOfInterval({ start, end });
  };

  const { clickedEvent, currentEvents: events } = useContext(SidebarContext);

  const { isPhone } = useResponsive();


  return (
    <>
      <div className="calender_sidebar">
        <MiniCalendar firstDayOfWeek={1} getDaysInMonth={getDaysInMonth} />
        {!isPhone && (
          <div className="daily-schedule">
            {events &&
              events.map((event) => {
                const eventDate = new Date(event.start);
                if (clickedEvent && isSameDay(eventDate, clickedEvent)) {
                  return (
                    <section key={event.title} className="event-wrapper">
                      <div className="bullet"></div>
                      <div className="event">
                        <div className="time">
                          <span>
                            {format(new Date(event.start), "hh:mm a", {
                              locale: ar,
                            })}
                          </span>

                          <span>-</span>

                          {event.end && (
                            <span>
                              {format(new Date(event.end), "hh:mm a", {
                                locale: ar,
                              })}
                            </span>
                          )}
                        </div>
                        <div>{event.title}</div>
                      </div>
                    </section>
                  );
                }
              })}
          </div>
        )}
      </div>
      {isPhone && (
        <section className="daily-schedule--phone">
          {events &&
            events.map((event) => {
              const eventDate = new Date(event.start);
              if (clickedEvent && isSameDay(eventDate, clickedEvent)) {
                return (
                  <article key={event.title} className="event-wrapper--phone">
                    <section className="event__info">
                      <h3>{event.title}</h3>
                      <div className="event__info--group">
                        <PH_teacherIcon />
                        <span>{event.employee}</span>
                      </div>
                      <div className="event__info--group">
                        <PH_calendarIcon />
                        <span>{formatDaysAndMonths(event.start)}</span>
                      </div>
                      <div className="event__info--group">
                        <Clock />
                        <div className="time">
                          <span>
                            {formatHoursAndMinutes(event.start)}
                          </span>

                          <span>-</span>

                          {event.end && (
                            <span>
                              {formatHoursAndMinutes(event.end)}
                            </span>
                          )}
                        </div>
                      </div>
                    </section>
                  </article>
                );
              }
            })}
        </section>
      )}
    </>
  );
};

export default Sidebar;
