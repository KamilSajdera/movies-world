import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import NowPlayingPage from "./pages/NowPlayingPage";
import PopularPage from "./pages/PopularPage";
import NewlyAddedPage from "./pages/NewlyAddedPage";
import DiscoverPage from "./pages/DiscoverPage";
import TopRatedPage from "./pages/TopRatedPage";
import PeoplePage from "./pages/PeoplePage";

const router = createBrowserRouter([
  { path: "/", element: <RootPage />, children: [
    { index: true, element: <HomePage /> }, 
    { path: "nowplaying", element: <NowPlayingPage /> },
    { path: "popular", element: <PopularPage /> },
    { path: "newlyadded", element: <NewlyAddedPage /> },
    { path: "discover", element: <DiscoverPage /> },
    { path: "toprated", element: <TopRatedPage /> },
    { path: "people", element: <PeoplePage /> },
  ]}
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
