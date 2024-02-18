import { Layout } from "antd";
import Sideber from "./Sideber";
import { Outlet } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../redex/hook";
import { logout } from "../../redex/feature/auth/authSlice";
import { selectCurrentUser } from "../../redex/store";
import { useSingleUserQuery } from "../../redex/feature/auth/authApi";
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const { data: userData } = useSingleUserQuery(user?._id)
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
          <div className="flex justify-center items-center space-x-5">
            {user?.role === "user" ? <h1 className="text-xl font-semibold text-gray-500">Point : <span className="text-green-500">{userData?.data?.UFpoint}</span></h1> : ""}
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
