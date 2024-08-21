import { useAppDispatch, useAppSelector } from "@/store/hooks";
import actGetLessons from "@/store/lessons/act/actGetLessons";
import React, { useEffect, useRef, useState } from "react";
import CalendarIconForCard from "@/assets/calendarForCard.svg?react";
import ClockIcon from "@/assets/clock.svg?react";
import FlagIcon from "@/assets/flag.svg?react";
import BulbIcon from "@/assets/light-bulb.svg?react";
import FolderIcon from "@/assets/folder-open.svg?react";

import styles from "./homePage.module.css";
import formatArabicDate from "@/utils/formatArabicDate";
import formatHoursAndMinutes from "@/utils/formatHoursAndMinutes";
import { Modal } from "@/components";
import { TModalRef } from "@/components/modal/Modal";

const { classBox, classes_container, attendance_status, action_btn } = styles;
const TeacherHomePage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { today_lessons } = useAppSelector((state) => state.lessons);
  const [id, setId] = useState<number>();

  const dispatch = useAppDispatch();

  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    dispatch(actGetLessons({ token: user?.token, from_date: today }));
  }, [dispatch, user?.token, today]);

  const dialogRef = useRef<TModalRef>(null);

  const openModal = () => {
    dialogRef.current?.open();
  };

  return (
    <>
      <Modal ref={dialogRef} lesson_id={id} />
      <p className={styles.greeting}>
        مرحبا{" "}
        <span>
          {user?.first_name} {user?.last_name}
        </span>
      </p>
      <h1>حصص اليوم</h1>
      <section className={classes_container}>
        {today_lessons?.map((lesson) => (
          <article
            className={classBox}
            key={lesson.id}
            onClick={() => setId(lesson.id)}
          >
            <section>
            <h4>الطالب: {lesson.participants[0].student_name}</h4>
              <div>
                <CalendarIconForCard />
                <span>{formatArabicDate(lesson.from_date)}</span>
              </div>
              <div>
                <ClockIcon style={{ stroke: "var(--secondary-color)" }} />
                <span>
                  {formatHoursAndMinutes(lesson.from_datetime)} -{" "}
                  {formatHoursAndMinutes(lesson.to_datetime)}
                </span>
              </div>
              
            </section>

            <section>
              <div>
                <BulbIcon />
                <span
                  onClick={openModal}
                  style={{ color: "var(--main-color)", cursor: "pointer" }}
                >
                  اترك تقييم الحصة
                </span>
              </div>
              <div>
                <FlagIcon />
                <span style={{ color: "#E11D48" }}>
                  هل حدثت مشكلة أثناء الحصة؟
                </span>
              </div>
            </section>

            <section>
              <button className={action_btn}>
                <FolderIcon />
                <span>عرض الملفات</span>
              </button>
              <span className={attendance_status}>تم الحضور</span>
            </section>
          </article>
        ))}
        {today_lessons?.length === 0 && <h4>ليس لديك حصص هذا اليوم</h4>}
      </section>
      {/* <button onClick={() => dispatch(actGetLessons({ token: user?.token, next }))}>الباقي</button> */}
    </>
  );
};

export default TeacherHomePage;
