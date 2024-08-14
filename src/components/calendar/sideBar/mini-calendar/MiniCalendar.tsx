import {
  addDays,
  addMonths,
  format,
  isSameDay,
  isWithinInterval,
  subDays,
  subMonths,
} from "date-fns";
import { ar } from "date-fns/locale";
import { TFirstDayOfWeek } from "@/types/shared";

import styles from "./MiniCalendar.module.css";
import { TEvent } from "../../Calendar";
import { useContext } from "react";
import { SidebarContext } from "@/store/context/SidebarContext";
import { useResponsive } from "@/hooks";

type TMiniCalendarProps = {
  getDaysInMonth: (date: Date) => Date[];
  firstDayOfWeek: TFirstDayOfWeek;
};

const MiniCalendar = ({
  getDaysInMonth,
  firstDayOfWeek,
}: TMiniCalendarProps) => {
  const {
    currentDate,
    handleDateChange,
    setClickedEvent,
    currentEvents: events,
    clickedEvent,
  } = useContext(SidebarContext);

  const { isPhone } = useResponsive();

  console.log("from mini calendar events", events);

  const goToNextMonth = () => handleDateChange(addMonths(currentDate, 1));
  const goToPrevMonth = () => handleDateChange(subMonths(currentDate, 1));

  const days = getDaysInMonth(currentDate);

  const weekdays = !isPhone
    ? ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"]
    : ["ح", "ن", "ث", "ر", "خ", "ج", "س"];

  const orderedWeekdays = [
    ...weekdays.slice(firstDayOfWeek),
    ...weekdays.slice(0, firstDayOfWeek),
  ];

  const groupedEvents = events?.reduce((acc, event) => {
    const day = new Date(event.start);
    const date = format(day, "yyyy-MM-dd", { locale: ar });

    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(event);

    return acc;
  }, {} as Record<string, TEvent[]>);

  return (
    <div className={styles.mini_calendar}>
      <header>
        <span>{format(currentDate, "MMMM yyyy", { locale: ar })}</span>
        <div className={styles.buttons}>
          <button onClick={goToPrevMonth}>&lt;</button>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
      </header>

      <div className={styles.days}>
        {orderedWeekdays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}

        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`${styles.day} ${
              clickedEvent && isSameDay(day, clickedEvent) ? styles.active : ""
            } ${
              day.getMonth() !== currentDate.getMonth()
                ? styles.other_month
                : ""
            }`}
            onClick={() => setClickedEvent(day)}
          >
            {groupedEvents &&
              (groupedEvents[format(day, "yyyy-MM-dd", { locale: ar })]
                ?.length > 0 ? (
                <span className={styles.events_count}>
                  {
                    groupedEvents[format(day, "yyyy-MM-dd", { locale: ar })]
                      ?.length
                  }
                </span>
              ) : (
                ""
              ))}
            {format(day, "d")}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MiniCalendar;
