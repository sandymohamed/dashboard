import { NavLink } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";
import SettingsIcon from "@/assets/settings.svg?react";
import HelpIcon from "@/assets/help.svg?react";

import styles from "./MainSidebar.module.css";
import { TPath } from "@/types/shared";

type TSidebarProps = {
  data: TPath[];
};

const MainSidebar = ({ data }: TSidebarProps) => {
  const { sidebar, logo } = styles;
  

  return (
    <aside className={sidebar}>
      <Logo className={logo} />
      <section>
        <menu>
          {data.map(({ title, path, icon }) => (
            <li key={title}>
              <NavLink
                to={path}
                end
                replace
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {icon}
                {title}
              </NavLink>
            </li>
          ))}
        </menu>
        <menu>
          <li>
            <NavLink to="settings">
              <SettingsIcon />
              الاعدادات
            </NavLink>
          </li>
          <li>
            <NavLink to="help">
              <HelpIcon />
              طلب مساعدة
            </NavLink>
          </li>
        </menu>
      </section>
    </aside>
  );
};

export default MainSidebar;
