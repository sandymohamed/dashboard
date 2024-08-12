import { Outlet } from "react-router-dom";
import { Header, MainSidebar } from "@/components";
import { TPath } from "@/types/shared";
const MainLayout = ({ sideBarData }: { sideBarData: TPath[] }) => {
  return (
    <main className="container mainContainer">
      <MainSidebar data={sideBarData} />
      <div className="contentBox">
        <Header />
        <section className="content">
          <Outlet />
        </section>
      </div>
    </main>
  );
};

export default MainLayout;
