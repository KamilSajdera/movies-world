import { Outlet } from "react-router-dom";
import TopNavigation from "../components/TopNavigation/TopNavigation";

const RootPage = () => {
  const mainStyle = {
    width: "100%",
    minHeight: "100vh",
    color: "#fff",
    paddingTop: "55px"
  };

  return (
    <>
      <TopNavigation />
      <main style={mainStyle}>
        <Outlet />
      </main>
    </>
  );
};

export default RootPage;
