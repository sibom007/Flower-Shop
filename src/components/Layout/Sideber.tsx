import { Layout, Menu } from "antd";
import { UserPaths } from "../../routes/user.Routes";
import { ManagerPaths } from "../../routes/manager.roites";
import { useAppSelector } from "../../redex/hook";
import { useCurrentToken } from "../../redex/store";
import { verifyToken } from "../../utils/veryfyToken";
import { TUser } from "../../types/authSlice.Type";
import { AdminPaths } from "../../routes/admin.routs";
import { sidebarItemsGenerator } from "../../utils/sideBargenater";
const { Sider } = Layout;

export const USERRole = {
  USER: "user",
  MANAGER: "manager",
  ADMIN: "admin"
};

const Sideber = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = verifyToken(token);
  }
  let sidebarItems

  switch ((user as TUser)!.role) {
    case USERRole.ADMIN:
      sidebarItems = sidebarItemsGenerator(AdminPaths, USERRole.ADMIN);
      break;

    case USERRole.MANAGER:
      sidebarItems = sidebarItemsGenerator(ManagerPaths, USERRole.MANAGER);
      break;

    case USERRole.USER:
      sidebarItems = sidebarItemsGenerator(UserPaths, USERRole.USER);
      break;

    default:
      break;
  }

  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0px"
      onBreakpoint={(broken) => {
        console.log(broken);
      }}
      onCollapse={(collapsed) => {
        console.log(collapsed);
      }}
      style={{ background: "#eae8dc" }}
    >
      <div
        style={{
          color: "white",
          height: "5rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            color: "black",
            background: "",
            fontSize: "24px",
            borderRadius: "7px",
            padding: "10px",
            boxShadow: "3px 4px 3px 3px rgba(0, 0, 0, 0.1)",
          }}
        >
          Flower Shop
        </h1>
      </div>
      <Menu
        style={{ background: "#eae8dc" }}
        mode="inline"
        defaultSelectedKeys={["4"]}
        items={sidebarItems}
      />
    </Sider>

  );
};

export default Sideber;

