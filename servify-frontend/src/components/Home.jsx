import { useSelector } from "react-redux";
import Browse from "./Browse";
import Footer from "./Footer";
import Header from "./Header";
import Services from "./Services";
import { Navigate } from "react-router-dom";

const Home = () => {
  const user = useSelector((store) => store.user.user);

  if (user === true) {
    return <Navigate to="/unauthorized" replace />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full overflow-x-hidden bg-white">
      {/* The Header is 'fixed', so it floats. 
          We need to ensure the content below it doesn't get hidden.
      */}
      <Header />

      {/* pt-[80px]: Standard mobile header height 
          md:pt-[100px]: Medium screens
          lg:pt-[120px]: Large screens where header might be taller
      */}
      <main className="flex-grow pt-[110px] md:pt-[120px] lg:pt-0">
        {/* Note: I used lg:pt-0 because the 'Browse' component 
            already has internal padding (pt-24/36/44) which handles 
            the desktop spacing. This fix specifically targets mobile/tablet overlap.
        */}
        <Browse />
        <Services />
      </main>

      <Footer />
    </div>
  );
};

export default Home;
