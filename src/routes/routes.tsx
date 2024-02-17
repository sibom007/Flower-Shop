import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { routesGenater } from "../utils/routesGenater";
import { UserPaths } from "./user.Routes";
import Login from "../pages/Login";
import Regester from "../pages/Regester";
import { ManagerPaths } from "./manager.roites";
import { AdminPaths } from "./admin.routs";
import ProtectedRoutes from "../components/Layout/ProtectedRoutes";
import { userRole } from "../components/Layout/Sideber";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/user",
    element: <ProtectedRoutes role={`${userRole.USER}`}><App /></ProtectedRoutes>, 
    children: routesGenater(UserPaths),
  },
  {
    path: "/manager",
    element: <ProtectedRoutes role={`${userRole.MANAGER}`}><App /></ProtectedRoutes>,
    children: routesGenater(ManagerPaths),
  },
  {
    path: "/admin",
    element: <ProtectedRoutes role={`${userRole.ADMIN}`}><App /></ProtectedRoutes>,
    children: routesGenater(AdminPaths),
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
