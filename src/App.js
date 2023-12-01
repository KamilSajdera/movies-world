import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import NowPlayingPage from "./pages/NowPlayingPage";
import PopularPage from "./pages/PopularPage";
import NewlyAddedPage from "./pages/NewlyAddedPage";
import DiscoverPage from "./pages/DiscoverPage";
import TopRatedPage from "./pages/TopRatedPage";
import {
  PeoplePage,
  loader as peoplePageLoader,
} from "./pages/PeoplePage";
import ProfilePage, { loader as profilePageLoader } from "./pages/ProfilePage";
import ErrorPage from "./ui/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "nowplaying", element: <NowPlayingPage /> },
      { path: "popular", element: <PopularPage /> },
      { path: "newlyadded", element: <NewlyAddedPage /> },
      { path: "discover", element: <DiscoverPage /> },
      { path: "toprated", element: <TopRatedPage /> },
      {
        path: "people",
        children: [
          { index: true, element: <PeoplePage />, loader: peoplePageLoader},
          { path: ":pageNumber", element: <PeoplePage />, loader: peoplePageLoader},
          { path: "profile/:profileId", element: <ProfilePage />, loader: profilePageLoader}
        ]
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
