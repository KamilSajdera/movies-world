import { Outlet, useNavigation, ScrollRestoration } from "react-router-dom";

import TopNavigation from "../components/TopNavigation/TopNavigation";
import LoaderPage from "../ui/LoaderPage";
import Footer from "../components/footer/Footer";

const RootPage = () => {
  const { state } = useNavigation();

  const mainStyle = {
    width: "100%",
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
      <Footer />
    </>
  );
};

export default RootPage;

