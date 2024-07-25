import styles from "./header.module.css";
import MenuIcon from "@/assets/menu.svg?react";
import Bell from "@/assets/BellOutline.svg?react";
import Avatar from "@/assets/person.svg?react";

const { header, wrapper, box, btn, badge } = styles;
const Header = () => {
  return (
    <header className={header}>
      <section className={wrapper}>
        <MenuIcon />
        <div className={box}>
          <button className={btn}>En</button>
          <div>
            <Bell />
            <span className={badge}>1</span>
          </div>
          <div>
            <Avatar />
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
