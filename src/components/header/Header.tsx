import styles from "./header.module.css";
import Logo from "@/assets/logo.svg?react";
import MenuIcon from "@/assets/menu.svg?react";
import Bell from "@/assets/BellOutline.svg?react";
import UserPhoto from "@/assets/profilePlaceholder.svg?react";
import { useResponsive } from "@/hooks";
import { useAppSelector } from "@/store/hooks";
import { useContext } from "react";
import { SidebarContext } from "@/store/context/SidebarContext";

const { header, wrapper, box, btn, badge, menuIcon, userPhoto, notifications, bell } = styles;
const Header = () => {

  const { setIsSidebarOpen } = useContext(SidebarContext)

  const { isPhone } = useResponsive();

  const { user } = useAppSelector((state) => state.profile);

  return (
    <header className={header}>
      <section className={wrapper}>
        {isPhone && <Logo />}
        <div className={box}>
          {!isPhone && <button className={btn}>En</button>}
          <div className={notifications}>
            <Bell className={bell} />
            <span className={badge}>1</span>
          </div>
          {isPhone && <MenuIcon className={menuIcon} onClick={() => setIsSidebarOpen(prevState => !prevState)} />}
          {!isPhone && <div className={userPhoto}>
            {user?.image ? <img src={user?.image} alt="Avatar" /> : <UserPhoto />}
          </div>}
        </div>
      </section>
    </header>
  );
};

export default Header;
