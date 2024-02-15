import { Layout, Menu } from "antd";
import { sidebarItemsGenater } from "../../utils/sideBargenater";
import { UserPaths } from "../../routes/user.Routes";
import { ManagerPaths } from "../../routes/manager.roites";
import { useAppSelector } from "../../redex/hook";
import { useCurrentToken } from "../../redex/store";
import { varyfyToken } from "../../utils/veryfyToken";
import { TUser } from "../../types/authSlice.Type";


const { Sider } = Layout;

const userRole = {
  USER: "user",
  MANAGER: "manager",
};

const Sideber = () => {
  const token = useAppSelector(useCurrentToken);
  let user;
  if (token) {
    user = varyfyToken(token);
  }
  let sideBarRole;
  switch ((user as TUser)!.role) {
    case userRole.USER:
      sideBarRole = sidebarItemsGenater(UserPaths, userRole.USER);
      break;
    case userRole.MANAGER:
      sideBarRole = sidebarItemsGenater(ManagerPaths, userRole.MANAGER);
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
        items={sideBarRole}
      />
    </Sider>
  );
};

export default Sideber;
