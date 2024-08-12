import { NavLink, Outlet } from "react-router-dom";
import styles from "./settings.module.css";
import { useAppSelector } from "@/store/hooks";

const { nav, selected } = styles;
const SettingsPage = () => {
  const { user } = useAppSelector((state) => state.auth);

  return (
    <>
      <nav className={nav}>
        <NavLink
          to=""
          end
          replace
          className={({ isActive }) => (isActive ? selected : "")}
        >
          إعدادات الحساب
        </NavLink>

        <NavLink
          to="security"
          end
          replace
          className={({ isActive }) => (isActive ? selected : "")}
        >
          تسجيل الدخول والأمان
        </NavLink>

        {user?.user_type === "Admin" && (
          <NavLink
            to="roles"
            end
            replace
            className={({ isActive }) => (isActive ? selected : "")}
          >
            الأدوار والمسؤوليات
          </NavLink>
        )}

      </nav>
      <section>
        <Outlet />
      </section>
    </>
  );
};

export default SettingsPage;
