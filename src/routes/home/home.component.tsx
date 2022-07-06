import { Outlet } from "react-router-dom"; // React Router
import Directory from "../../components/directory/directory.component";

const Home = () => {
  return (
    <div>
      <Directory />
      <Outlet />
    </div>
  );
};

export default Home;
