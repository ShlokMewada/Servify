import { useSelector } from "react-redux";
import useCounter from "../hooks/useCounter";
import Footer from "./Footer";
import Header from "./Header";
import EmployeeHeader from "./EmployeeHeader";

const About = () => {
  const professionalCount = useCounter(30000, 0, 1000);
  const customerCount = useCounter(4, 0, 1000);
  const cityCount = useCounter(150, 0, 1000);
  const countryCount = useCounter(2, 0, 1000);
  const user = useSelector((store) => store.user.user);
  return (
    <div className="w-full bg-gray-50 py-12 ">
      <div className="fixed top-0 left-0 right-0 z-10">
        {!user ? <Header /> : <EmployeeHeader />}
      </div>
      <div className="max-w-6xl flex flex-col items-center gap-y-16 mx-auto px-4 mt-28">
        <h1 className="text-5xl font-extrabold text-gray-800">About Us</h1>
        <div className="w-full h-[2px] bg-gradient-to-r from-gray-200 via-gray-400 to-gray-200"></div>
        <p className="text-gray-700 text-xl leading-relaxed text-center max-w-4xl">
          Servify is a platform offering a variety of services at home.
          Customers use our platform to book services such as beauty treatments,
          haircuts, massage therapy, cleaning, plumbing, carpentry, appliance
          repair, painting etc. These services are delivered in the comfort of
          their home and at a time of their choosing.
        </p>
        <div className="flex w-full justify-around flex-wrap gap-y-8">
          <div className="flex flex-col gap-y-2 items-center">
            <span className="text-3xl font-extrabold text-gray-700 mb-2">
              {professionalCount}+
            </span>
            <span className="text-gray-600 text-lg">Trained Professionals</span>
          </div>
          <div className="flex flex-col gap-y-2 items-center">
            <span className="text-3xl font-extrabold text-gray-700 mb-2">
              {customerCount} Million+
            </span>
            <span className="text-gray-600 text-lg">Happy Customers</span>
          </div>

          <div className="flex flex-col gap-y-2 items-center">
            <span className="text-3xl font-extrabold text-gray-700 mb-2">
              {cityCount}+
            </span>
            <span className="text-gray-600 text-lg">Cities Covered</span>
          </div>

          <div className="flex flex-col gap-y-2 items-center">
            <span className="text-3xl font-extrabold text-gray-700 mb-2">
              {countryCount}
            </span>
            <span className="text-gray-600 text-lg">Countries Served</span>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
