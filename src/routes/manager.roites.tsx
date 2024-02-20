import AddFlower from "../pages/Manager/AddFlower";
import Dashbord from "../pages/Dashbord";
import DuplicateFlower from "../pages/Manager/DuplicateFlower";
import FlowerInventory from "../pages/flower/FlowerInventory";
import Updateflower from "../pages/Manager/Updateflower";
import UserManagementMTU from "../pages/Manager/UserManagementMTU";
import Addcoupons from "../pages/Manager/Addcoupons";
import Coupons from "../pages/Manager/Coupons";

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
                path: "flowerinventory/:FlowerId",
                element: <Updateflower />,
            },
            {
                path: "DuplicateFlower/:FlowerId",
                element: <DuplicateFlower />,
            },
            {
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
    {
        name: "Coupon Management",
        children: [
            {
                name: "Add Coupons",
                path: "addcoupons",
                element: <Addcoupons />,
            },
            {
                name: "Coupons",
                path: "Allcoupons",
                element: <Coupons />,
            },
        ],
    },
];
