import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenater } from "../utils/routesGenater";
import { UserPaths } from "./user.Routes";
import Login from "../pages/Login";
import Regester from "../pages/Regester";
import { ManagerPaths } from "./manager.roites";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <App />,
    children: routesGenater(UserPaths),
  },
  {
    path: "/manager",
    element: <App />,
    children: routesGenater(ManagerPaths),
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/regester",
    element: <Regester />,
  },
]);
export default router;
