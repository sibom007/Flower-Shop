import AddFlower from "../pages/flower/AddFlower";
import Dashbord from "../pages/flower/Dashbord";
import FlowerInventory from "../pages/flower/FlowerInventory";
import Updateflower from "../pages/flower/Updateflower";

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
        ],
    },
];
