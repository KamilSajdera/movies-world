import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootPage from "./pages/RootPage";
import HomePage from "./pages/HomePage";
import NowPlayingPage, {
  loader as NowPlayingLoader,
} from "./pages/NowPlayingPage";
import PopularPage, { loader as PopularPageLoader } from "./pages/PopularPage";
import NewlyAddedPage from "./pages/NewlyAddedPage";
import DiscoverPage from "./pages/DiscoverPage";
import TopRatedPage, { loader as topRatedLoader } from "./pages/TopRatedPage";
import { PeoplePage, loader as peoplePageLoader } from "./pages/PeoplePage";
import ProfilePage, { loader as profilePageLoader } from "./pages/ProfilePage";
import FilmDetailsPage, {
  loader as movieDetailsLoader,
} from "./pages/FilmDetailsPage";
import ErrorPage from "./ui/ErrorPage";
import SearchPage, { loader as searchTermLoader } from "./pages/SearchPage";
import SerialDetailsPage, { loader as tvPageLoader } from "./pages/SerialDetailsPage";
import CreditsPage, { loader as creditsLoader } from "./pages/CreditsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "nowplaying",
        element: <NowPlayingPage />,
        loader: NowPlayingLoader,
      },
      { path: "popular", element: <PopularPage />, loader: PopularPageLoader },
      { path: "newlyadded", element: <NewlyAddedPage /> },
      { path: "discover", element: <DiscoverPage /> },
      { path: "toprated", element: <TopRatedPage />, loader: topRatedLoader },
      {
        path: "people",
        children: [
          { index: true, element: <PeoplePage />, loader: peoplePageLoader },
          {
            path: "profile",
            element: <ProfilePage />,
            loader: profilePageLoader,
          },
        ],
      },
      {
        path: "movie",
        element: <FilmDetailsPage />,
        loader: movieDetailsLoader,
      },
      {
        path: "tv",
        element: <SerialDetailsPage />,
        loader: tvPageLoader,
      },
      {
        path: "search",
        element: <SearchPage />,
        loader: searchTermLoader,
      },
      {
        path: "credits",
        element: <CreditsPage />,
        loader: creditsLoader
      }
    ],
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
