import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { PublicLayout } from "./layouts/PublicLayout";
import { HomeView } from "./pages/HomeView";
import { Login } from "./pages/auth/LoginView";
import { Callback } from "./components/nav/Callback";
import NotFound from "./components/NotFound";
import { FavoriteMovies } from "./components/movies/FavoriteMovies";
import MovieDetail from "./components/movies/MovieDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { path: "/", element: <HomeView /> },
      { path: "/favorites", element: <FavoriteMovies /> },
      { path: "/movies/:movieId", element: <MovieDetail /> },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "callback", element: <Callback /> },
  { path: "*", element: <NotFound /> },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
