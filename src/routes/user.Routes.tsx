import UserDashbord from "../pages/UserDashbord";
import FlowerInventory from "../pages/flower/FlowerInventory";

export const UserPaths = [
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

    ],
  },
];
