import { Outlet, useNavigation, ScrollRestoration } from "react-router-dom";

import TopNavigation from "../components/TopNavigation/TopNavigation";
import LoaderPage from "../ui/LoaderPage";

const RootPage = () => {
  const { state } = useNavigation();

  const mainStyle = {
    width: "100%",
    minHeight: "100vh",
    color: "#fff",
    paddingTop: "55px",
  };

  return (
    <>
      {state === "loading" && <LoaderPage />}
      <TopNavigation />
      <main style={mainStyle}>
        <Outlet />
      </main>
      <ScrollRestoration />
    </>
  );
};

export default RootPage;

