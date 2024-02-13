import UserDashbord from "../pages/UserDashbord";
import AddFlower from "../pages/flower/AddFlower";
import FlowerInventory from "../pages/flower/FlowerInventory";
import MyFlowerInventory from "../pages/flower/MyFlowerInventory";
import Updateflower from "../pages/flower/Updateflower";

export const UserPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <UserDashbord />,
  },
  {
    name: "Flower Inventory",
    path: "Flowerinventory",
    element: <FlowerInventory />,
  },
  {
    name: "Flower Management",
    children: [
      {
        name: "My Flower Inventory",
        path: "myflowerinventory",
        element: <MyFlowerInventory />,
      },
      {
        name: "Add Your flower",
        path: "AddFlower",
        element: <AddFlower />,
      },
      {
        name: "some error Do not touch that button",
        path: "/user/myflowerinventory/updateflower/:id",
        element: <Updateflower />,
      },
    ],
  },
];
