import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import HomePage from "../Pages/HomePage";
import Movies from "../Pages/Movies";
import MovieDetail from "../Pages/MovieDetail";
import TvShows from "../Pages/TvShows";
import Watchlist from "../Pages/Watchlist";
import ProfileNav from "../Commponants/Layout/ProfileNav";
import SearchNav from "../Commponants/Layout/SearchNav";
import LoginForm from "../Commponants/Auth/LoginForm";
import SignForm from "../Commponants/Auth/SignForm";

const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayouts />,
        children: [
            {index: true, element:<HomePage/> },
            {path: "Movies", element:<Movies/>},
            {path: "movies/:id", element:<MovieDetail/>},
            {path: "TvShows", element:<TvShows/>},
            {path: "Watchlist", element:<Watchlist/>},
            {path:"ProfileNav",element:<ProfileNav/>},
            {path:"SearchNav",element:<SearchNav/>}
        ]
    },
    {
        path: "/auth/login",
        element: <LoginForm />
    },
    {
        path: "/auth/signup",
        element: <SignForm />
    }
]);

export default function AppRouters() {
  return <RouterProvider router={router} />;
}