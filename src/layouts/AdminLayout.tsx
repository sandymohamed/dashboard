import Logo from "@/assets/logo.svg?react";
import { Header } from "@/components";
import { Calendar } from "@/components";
import { logout } from "@/store/auth/authSlice";
import { useAppDispatch } from "@/store/hooks";
const AdminLayout = () => {
  // const {user} = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  return (
    <main className="container">
      <Header />
      <aside className="sidebar">
        <Logo className="logo" />
      </aside>
      <section className="content">
        <Calendar />
      </section>
      <button
        className="logout"
        onClick={() => {
          dispatch(logout());
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </main>
  );
};

export default AdminLayout;
