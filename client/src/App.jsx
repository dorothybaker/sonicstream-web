import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import { useQuery } from "@tanstack/react-query";
import { API } from "./utils/makeRequest";
import Search from "./pages/Search";
import Liked from "./pages/Liked";
import Player from "./components/Player";

function Layout() {
  return (
    <div className="max-w-[1500px] mx-auto w-full">
      <Sidebar>
        <Outlet />
      </Sidebar>
      <Player />
    </div>
  );
}

function App() {
  const { data: user } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await API.get("/auth/me");

        if (res.status === 200) {
          const data = res.data;

          return data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/search", element: <Search /> },
        { path: "/liked", element: user ? <Liked /> : <Navigate to={"/"} /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
