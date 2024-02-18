import UserManagementATM from "../pages/Admin/UserManagementATM";
import Dashbord from "../pages/Dashbord";


export const AdminPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <Dashbord />,
    },
    {
        name: "User Management",
        children: [
            {
                name: "Users",
                path: "UserManagementATM",
                element: <UserManagementATM />,
            },
        ],
    },
];
