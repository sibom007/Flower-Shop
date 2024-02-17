import MainLayout from "./components/Layout/MainLayout";
import ProtectedRoutes from "./components/Layout/ProtectedRoutes";

const App = () => {
  return (
    <ProtectedRoutes role={undefined}>
      <MainLayout />
    </ProtectedRoutes>
  );
};

export default App;
