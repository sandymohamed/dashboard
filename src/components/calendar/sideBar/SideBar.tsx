import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  startOfWeek,
  endOfWeek,
} from "date-fns";
import { ar } from "date-fns/locale";
import "./Sidebar.css";

const Sidebar = ({
  currentDate,
  onDateChange,
  firstDayOfWeek,
}: {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  firstDayOfWeek: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}) => {
  const goToNextMonth = () => onDateChange(addMonths(currentDate, 1));
  const goToPrevMonth = () => onDateChange(subMonths(currentDate, 1));

  const getDaysInMonth = (date: Date) => {
    const start = startOfWeek(startOfMonth(date), { weekStartsOn: firstDayOfWeek });
    const end = endOfWeek(endOfMonth(date), { weekStartsOn: firstDayOfWeek });
    return eachDayOfInterval({ start, end });
  };

  const renderMiniCalendar = () => {
    const days = getDaysInMonth(currentDate);
    const weekdays = [
      "أحد",
      "اثنين",
      "ثلاثاء",
      "أربعاء",
      "خميس",
      "جمعة",
      "سبت",
    ];
    const orderedWeekdays = [...weekdays.slice(firstDayOfWeek), ...weekdays.slice(0, firstDayOfWeek)];

    return (
      <div className="mini-calendar">
        <div className="mini-calendar-header">
          <button onClick={goToPrevMonth}>&lt;</button>
          <span>{format(currentDate, "MMMM yyyy", { locale: ar })}</span>
          <button onClick={goToNextMonth}>&gt;</button>
        </div>
        <div className="weekdays">
          {orderedWeekdays.map(day => <div key={day} className="weekday">{day}</div>)}
        </div>
        <div className="days">
          {days.map((day) => (
            <div
              key={day.toISOString()}
              className={`day ${isSameDay(day, currentDate) ? "active" : ""} ${
                day.getMonth() !== currentDate.getMonth() ? 'other-month' : ''
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

  return (
    <div className="calender_sidebar">
      {renderMiniCalendar()}
      <div className="daily-schedule">
        {/* Add your daily schedule items here */}
      </div>
    </div>
  );
};

export default Sidebar;
