import { Outlet } from "react-router-dom";
import { Header, MainSidebar } from "@/components";
import { TPath } from "@/types/shared";
import { SidebarContextProvider } from "@/store/context/SidebarContext";
const MainLayout = ({ sideBarData }: { sideBarData: TPath[] }) => {
  return (
    <SidebarContextProvider>
      <main className="container mainContainer">
        <MainSidebar data={sideBarData} />
        <div className="contentBox">
          <Header />
          <section className="content">
            <Outlet />
          </section>
        </div>
      </main>
    </SidebarContextProvider>
  );
};

export default MainLayout;
