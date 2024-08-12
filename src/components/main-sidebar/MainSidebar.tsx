import { NavLink } from "react-router-dom";

import Logo from "@/assets/logo.svg?react";
import SettingsIcon from "@/assets/settings.svg?react";
import HelpIcon from "@/assets/help.svg?react";
import CloseArrow from "@/assets/closeArrow.svg?react";
import OpenArrow from "@/assets/openArrow.svg?react";

import styles from "./MainSidebar.module.css";
import { TPath } from "@/types/shared";
import { useState } from "react";

type TSidebarProps = {
  data: TPath[];
};

const MainSidebar = ({ data }: TSidebarProps) => {
  const { sidebar, logo, arrow, collapse } = styles;

  const [expanded, setExpanded] = useState(true);

  return (
    <aside className={sidebar} style={{ width: expanded ? "200px" : "85px", transition: "0.3s" }}>
      <Logo className={logo} style={{width: expanded ? 'auto' : '70px'}} />
      <section>
        <div className={arrow} onClick={() => setExpanded(!expanded)}>
          {expanded ? <CloseArrow /> : <OpenArrow />}
        </div>
        <menu>
          {data.map(({ title, path, icon }) => (
            <li key={title}>
              <NavLink
                to={path}
                end
                replace
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                <div className='icon' style={{ stroke: 'white' }}>{icon}</div>
                {/* To prioritize the opacity transition, we apply it here first. */}
                <span className={expanded ? "" : collapse} style={{opacity: expanded ? '1' : '0'}}>{title}</span>
              </NavLink>
            </li>
          ))}
        </menu>
        <menu>
          <li>
            <NavLink to="settings">
              <SettingsIcon />
              <span className={expanded ? "" : collapse} style={{opacity: expanded ? '1' : '0'}}>الاعدادات</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="help">
              <HelpIcon />
              <span className={expanded ? "" : collapse} style={{opacity: expanded ? '1' : '0'}}>طلب مساعدة</span>
            </NavLink>
          </li>
        </menu>
      </section>
    </aside>
  );
};

export default MainSidebar;
