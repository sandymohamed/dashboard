import Character from "@/assets/character.webp";
import styles from "./login.module.css";
import { Outlet } from "react-router-dom";

const LoginLayout = () => {

  const {
    wrapper,
    leftBox,
    rightBox,
    title,
    en_title,
    desc,
    characterImg,
    imgContainer,
  } = styles;

  return (
    <main className={`container ${wrapper}`}>
    <section className={rightBox}>
      <Outlet />
    </section>
    <section className={leftBox}>
      <div>
        <h1 className={title}>المدرسة.كوم</h1>
        <p className={en_title}>ELMADRASAH.COM</p>
        <p className={desc}>
          أول منصة تعليمية في الوطن العربى تقدم دورات متخصصة لكل الأعمار عبر
          الإنترنت.
        </p>
      </div>
      <div className={imgContainer}>
        <img src={Character} alt="Character" className={characterImg} />
      </div>
    </section>
  </main>
  )
}

export default LoginLayout