import { Calendar } from "@/components"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import actGetLessons from "@/store/lessons/act/actGetLessons";
import { useEffect } from "react";

const CalendarPage = () => {

  const dispatch = useAppDispatch();

  const { user } = useAppSelector(state => state.auth);

  const { lessons } = useAppSelector(state => state.lessons)
  
  const events = lessons?.map(event => ({
    id: event.id,
    title: event.service_name,
    start: event.from_datetime,
    end: event.to_datetime,
    description: event.description,
    location: event.location_name,
    status: event.status,
    employee: event.employee_name,
    timeZone: event.time_zone
  }));


  // useEffect(() => {
  //   if (!user) return
  //   dispatch(actGetLessons({token: user.token}))
  // }, [dispatch, user]);

  return <Calendar />
}

export default CalendarPage