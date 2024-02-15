import UserDashbord from "../pages/UserDashbord";
import AddFlower from "../pages/flower/AddFlower";
import FlowerInventory from "../pages/flower/FlowerInventory";

export const ManagerPaths = [
    {
        name: "Dashboard",
        path: "dashboard",
        element: <UserDashbord />,
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
            // {
            //     name: "",
            //     path: "/user/myflowerinventory/updateflower/:id",
            //     element: <Updateflower />,
            // },
        ],
    },
];
