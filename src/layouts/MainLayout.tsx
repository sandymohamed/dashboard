import { Outlet } from "react-router-dom";
import { Header, MainSidebar } from "@/components";
import { TPath } from "@/types/shared";
const MainLayout = ({ sideBarData }: { sideBarData: TPath[] }) => {

  return (
    <main className="container grid">
      <Header />
      <MainSidebar data={sideBarData} />
      <section className="content">
        <Outlet />
      </section>
    </main>
  );
};

export default MainLayout;
