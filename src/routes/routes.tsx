import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { UserPaths } from "./user.Routes";
import Login from "../pages/Login";
import Regester from "../pages/Regester";
import { ManagerPaths } from "./manager.roites";
import { AdminPaths } from "./admin.routs";
import ProtectedRoutes from "../components/Layout/ProtectedRoutes";
import { USERRole } from "../components/Layout/Sideber";
import { routeGenerator } from "../utils/routesGenater";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <ProtectedRoutes role={`${USERRole.USER}`}><App /></ProtectedRoutes>,
    children: routeGenerator(UserPaths),
  },
  {
    path: "/manager",
    element: <ProtectedRoutes role={`${USERRole.MANAGER}`}><App /></ProtectedRoutes>,
    children: routeGenerator(ManagerPaths),
  },
  {
    path: "/admin",
    element: <ProtectedRoutes role={`${USERRole.ADMIN}`}><App /></ProtectedRoutes>,
    children: routeGenerator(AdminPaths),
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
