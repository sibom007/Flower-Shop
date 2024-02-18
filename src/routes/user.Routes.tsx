
import Dashbord from "../pages/Dashbord";
import FlowerInventory from "../pages/flower/FlowerInventory";

export const UserPaths = [
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

    ],
  },
];
