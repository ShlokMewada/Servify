import axios from "axios";
import { useRef, useState } from "react";
import { checkValidDataContact } from "../utils/validate";
import Footer from "./Footer";
import Header from "./Header";
import EmployeeHeader from "./EmployeeHeader";
import { useSelector } from "react-redux";

const Contact = () => {
  const name = useRef();
  const email = useRef();
  const phoneNo = useRef();
  const contactMessage = useRef();
  const [nameErrorMsg, setNameErrorMsg] = useState();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [phoneNoErrorMsg, setPhoneNoErrorMsg] = useState();

  const user = useSelector((store) => store.user.user);

  const handleSubmit = async () => {
    const message = checkValidDataContact(
      name.current.value,
      email.current.value,
      phoneNo.current.value
    );

    setNameErrorMsg(message.nameMsg);
    setEmailErrorMsg(message.emailMsg);
    setPhoneNoErrorMsg(message.phoneNoMsg);

    if (
      message.nameMsg !== "" ||
      message.emailMsg !== "" ||
      message.phoneNoMsg !== ""
    ) {
      return;
    }

    //   const credentials = {
    //     name: name.current.value,
    //     email: email.current.value,
    //     phoneNo: phone.current.value,
    //     contactMessage: contactMessage.current.value
    //   };
    //   try {
    //     const response = await axios.post(
    //       "https://api.example.com/contact",
    //       credentials
    //     );
    //     console.log(response.data);
    //   } catch (error) {
    //     console.error("There was an error during sign-up!", error);
    //   }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between py-12">
      <div className="fixed top-0 left-0 right-0 z-10">
        {!user ? <Header /> : <EmployeeHeader />}
      </div>
      <div className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 mt-28">
        <form
          className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
            Contact Us
          </h2>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Full Name
            </label>
            <input
              id="name"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="text"
              placeholder="Enter Full Name"
              ref={name}
            />
            {nameErrorMsg && (
              <p className="mt-2 text-sm text-red-600">{nameErrorMsg}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="text"
              placeholder="Enter Email"
              ref={email}
            />
            {emailErrorMsg && (
              <p className="mt-2 text-sm text-red-600">{emailErrorMsg}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="phoneNo"
              className="block text-sm font-medium text-gray-700"
            >
              Phone no.
            </label>
            <input
              id="phoneNo"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="text"
              placeholder="Enter Phone Number"
              ref={phoneNo}
            />
            {phoneNoErrorMsg && (
              <p className="mt-2 text-sm text-red-600">{phoneNoErrorMsg}</p>
            )}
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Enter Message
            </label>
            <textarea
              ref={contactMessage}
              id="message"
              placeholder="Enter Message"
              className="w-full mt-1 px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
              rows="4"
            ></textarea>
          </div>

          <button
            className="w-full flex justify-center py-2 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
