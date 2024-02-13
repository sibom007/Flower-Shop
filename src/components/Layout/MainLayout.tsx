import { Layout } from "antd";
import Sideber from "./Sideber";
import { Outlet } from "react-router-dom";
import { useAppDispatch } from "../../redex/hook";
import { logout } from "../../redex/feature/auth/authSlice";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const handlesubmit = () => {
    dispatch(logout());
  };
  return (
    <Layout style={{ height: "100vh" }}>
      <Sideber />
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "end",
            alignItems: "center",
            background: "#eae8dc",
          }}
        >
          {" "}
          <div>
            <button
              className="text-lg text-white font-semibold rounded-lg bg-yellow-600 hover:bg-yellow-700 duration-200 active:translate-x-7 py-2 px-4"
              onClick={handlesubmit}
            >
              Logout
            </button>
          </div>
        </Header>
        <Content>
          <div className="h-full overflow-y-scroll pb-5">
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
