import { TLessonStatus } from "@/types/shared";
import styles from "./infoCard.module.css";
import React from "react";

const { infoCard } = styles;

type TInfoCardProps = {
  title: string;
  count: number;
  style: React.CSSProperties;
  icon: React.ReactNode;
  status: TLessonStatus;
  getLessonsForStatus?: (
    { lesson_status, next }: { lesson_status: TLessonStatus; next?: string | null }
  ) => void;
};

const InfoCard = ({
  title,
  count,
  style,
  icon,
  status,
  getLessonsForStatus,
}: TInfoCardProps) => {
  return (
    <article
      className={infoCard}
      style={style}
      onClick={() => getLessonsForStatus?.({ lesson_status: status })}
    >
      <section>{icon}</section>
      <section>
        <h3>{count}</h3>
        <span>{title}</span>
      </section>
    </article>
  );
};

export default InfoCard;
