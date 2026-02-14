import { useSelector } from "react-redux";
import Browse from "./Browse";
import Footer from "./Footer";
import Header from "./Header";
import Services from "./Services";
import { Navigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((store) => store.user.user);
  if (user===true) {
    return <Navigate to="/unauthorized" replace />;
  }
  return (
    <div>
      <Header />
      <Browse />
      <Services />
      <Footer />
    </div>
  );
};

export default Home;
