import { addMonths, format, isSameDay, subMonths } from "date-fns";
import { ar } from "date-fns/locale";
import { TFirstDayOfWeek } from "@/types/shared";

import styles from "./MiniCalendar.module.css";
import { TEvent } from "../../Calendar";

type TMiniCalendarProps = {
  getDaysInMonth: (date: Date) => Date[];
  currentDate: Date;
  firstDayOfWeek: TFirstDayOfWeek;
  onDateChange: (date: Date) => void;
  events: TEvent[] | null;
};

const MiniCalendar = ({
  getDaysInMonth,
  currentDate,
  firstDayOfWeek,
  onDateChange,
  events,
}: TMiniCalendarProps) => {

  const goToNextMonth = () => onDateChange(addMonths(currentDate, 1));
  const goToPrevMonth = () => onDateChange(subMonths(currentDate, 1));

  const days = getDaysInMonth(currentDate);

  const weekdays = ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت"];

  const orderedWeekdays = [
    ...weekdays.slice(firstDayOfWeek),
    ...weekdays.slice(0, firstDayOfWeek),
  ];

  return (
    <div className={styles.mini_calendar}>

      <header>
        <button onClick={goToPrevMonth}>&lt;</button>
        <span>{format(currentDate, "MMMM yyyy", { locale: ar })}</span>
        <button onClick={goToNextMonth}>&gt;</button>
      </header>

      <div className={styles.weekdays}>
        {orderedWeekdays.map((day) => (
          <div key={day} className="weekday">
            {day}
          </div>
        ))}
      </div>

      <div className={styles.days}>
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className={`${styles.day} ${isSameDay(day, currentDate) ? styles.active : ""} ${
              day.getMonth() !== currentDate.getMonth() ? styles.other_month : ""
            }`}
            onClick={() => onDateChange(day)}
          >
            {format(day, "d")}
          </div>
        ))}
      </div>

    </div>
  );
};

export default MiniCalendar;
