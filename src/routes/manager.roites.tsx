import AddFlower from "../pages/Manager/AddFlower";
import Dashbord from "../pages/flower/Dashbord";
import DuplicateFlower from "../pages/Manager/DuplicateFlower";
import FlowerInventory from "../pages/flower/FlowerInventory";
import Updateflower from "../pages/Manager/Updateflower";
import UserManagementMTU from "../pages/Manager/UserManagementMTU";

export const ManagerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <Dashbord />,
    },
   
    {
        name: "Flower Management",
        children: [
            {
                name: "Flower Inventory",
                path: "flowerinventory",
                element: <FlowerInventory />,
            },
            {
                name: "Add flower",
                path: "AddFlower",
                element: <AddFlower />,
            },
            {
                name: "",
                path: "flowerinventory/:FlowerId",
                element: <Updateflower />,
            },
            {
                name: "",
                path: "DuplicateFlower/:FlowerId",
                element: <DuplicateFlower />,
            },
            {
                name: "",
                path: "UserManagement",
                element: <UserManagementMTU />,
            },
        ],
    },
    {
        name: "User Management",
        children: [
            {
                name: "Users",
                path: "UserManagementMTU",
                element: <UserManagementMTU />,
            },
        ],
    },
];
