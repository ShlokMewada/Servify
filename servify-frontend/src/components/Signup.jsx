import axiosInstance, {
  axiosUnauthenticatedInstance,
} from "../utils/axiosInstance";
import { useRef, useState } from "react";
import { checkValidDataSignUp } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import useEmployeeSignupCategories from "../hooks/useEmployeeSignupCategories";

const Signup = ({ isEmployee }) => {
  const firstName = useRef();
  const lastName = useRef();
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const address = useRef();
  const [firstNameErrorMsg, setFirstNameErrorMsg] = useState();
  const [lastNameErrorMsg, setLastNameErrorMsg] = useState();
  const [userNameErrorMsg, setUserNameErrorMsg] = useState();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();
  const [addressErrorMsg, setAddressErrorMsg] = useState();
  const [categorySelect, setCategorySelect] = useState([]);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEmployeeSignupCategories(); // getting employee signup categories

  const employeeSignupCategories = useSelector(
    (store) => store.service.employeeSignupCategories
  );

  const navigateToSignInUser = () => {
    navigate("/login");
  };

  const navigateToSignInEmployee = () => {
    navigate("/employee/login");
  };

  const handleSubmit = async () => {
    // console.log(role); <<Role Check Console Log>>

    const message = checkValidDataSignUp(
      firstName.current.value,
      lastName.current.value,
      username.current.value,
      email.current.value,
      password.current.value
    );

    const addressMsg = address.current.value ? "" : "Address required!";

    setFirstNameErrorMsg(message.firstNameMsg);
    setLastNameErrorMsg(message.lastNameMsg);
    setUserNameErrorMsg(message.usernameMsg);
    setEmailErrorMsg(message.emailMsg);
    setPasswordErrorMsg(message.passwordMsg);
    setAddressErrorMsg(addressMsg);

    if (
      message.firstNameMsg !== "" ||
      message.lastNameMsg !== "" ||
      message.usernameMsg !== "" ||
      message.emailMsg !== "" ||
      message.passwordMsg !== "" ||
      addressMsg !== ""
    ) {
      return;
    }

    // const formData = new FormData();
    // formData.append("username", username.current.value);
    // formData.append("email", email.current.value);
    // formData.append("password", password.current.value);
    // formData.append("first_name", firstName.current.value);
    // formData.append("last_name", lastName.current.value);
    // formData.append("address", address.current.value);
    // if (isEmployee) {
    //   categorySelect.forEach((categoryId) => {
    //     formData.append("service_categories", categoryId);
    //   });
    // }

    const formData = isEmployee
      ? {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          address: address.current.value,
          service_categories: categorySelect,
        }
      : {
          username: username.current.value,
          email: email.current.value,
          password: password.current.value,
          first_name: firstName.current.value,
          last_name: lastName.current.value,
          address: address.current.value,
        };

    await axiosInstance
      .post(
        `http://localhost:8000/signup/${!isEmployee ? "user" : "employee"}/`,
        formData
      )
      .then(async (response) => {
        // console.log(response.data);
        // localStorage.setItem("user_id", response.data.user_id);
        // dispatch(addUser(response.data.is_employee));
        // console.log(formData.get("email"))
        await axiosUnauthenticatedInstance
          .post("http://localhost:8000/login/", {
            email: formData.email,
            password: formData.password,
          })
          .then((response) => {
            localStorage.setItem("accessToken", response.data.access);
            localStorage.setItem("refreshToken", response.data.refresh);
            localStorage.setItem("user_id", response.data.user_id);
            isEmployee &&
              localStorage.setItem("employee_id", response.data.employee_id);
            console.log(response.data);
            dispatch(addUser(response.data.is_employee));
            toast.success("Successfully Signed Up!");
            navigate("/");
          })
          .catch((error) => {
            console.error(error);
            toast.error(error.response.data.error);
          });
      })
      .catch((error) => {
        console.error(error);
        console.log(error.response.data.error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 md:py-10">
      <form
        className={`${
          isEmployee ? "w-8/12" : "max-w-md"
        } p-8 bg-white shadow-2xl rounded-lg space-y-6`}
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Sign Up
        </h2>

        <div className="flex gap-x-2 w-full">
          <div className="w-full">
            <label
              htmlFor="firstname"
              className="block text-sm font-medium text-gray-700"
            >
              First Name
            </label>
            <input
              id="firstname"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="text"
              placeholder="Enter First Name"
              ref={firstName}
            />
            {firstNameErrorMsg && (
              <p className="mt-2 text-sm text-red-600">{firstNameErrorMsg}</p>
            )}
          </div>
          <div className="w-full">
            <label
              htmlFor="lastname"
              className="block text-sm font-medium text-gray-700"
            >
              Last Name
            </label>
            <input
              id="lastname"
              className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              type="text"
              placeholder="Enter Last Name"
              ref={lastName}
            />
            {lastNameErrorMsg && (
              <p className="mt-2 text-sm text-red-600">{lastNameErrorMsg}</p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="text"
            placeholder="Enter Username"
            ref={username}
          />
          {userNameErrorMsg && (
            <p className="mt-2 text-sm text-red-600">{userNameErrorMsg}</p>
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
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            type="password"
            placeholder="Enter Password"
            ref={password}
          />
          {passwordErrorMsg && (
            <p className="mt-2 text-sm text-red-600">{passwordErrorMsg}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="address"
            className="block text-sm font-medium text-gray-700"
          >
            Address
          </label>
          <textarea
            id="address"
            className="mt-1 block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent resize-none"
            rows="4"
            placeholder="Enter Address"
            ref={address}
          ></textarea>
          {addressErrorMsg && (
            <p className="mt-2 text-sm text-red-600">{addressErrorMsg}</p>
          )}
        </div>
        {isEmployee && (
          <p className="block text-sm font-medium text-gray-700">
            Select Category:
          </p>
        )}
        <div className="flex flex-wrap gap-5">
          {employeeSignupCategories &&
            isEmployee &&
            employeeSignupCategories.map((category) => (
              <div key={category.id} className="flex gap-x-1">
                <p className="block text-sm font-medium text-gray-500">
                  {category["service-category"]}
                </p>
                <input
                  type="checkbox"
                  value={category.id}
                  checked={categorySelect.includes(category.id)} // Check if the category is selected
                  onChange={(e) => {
                    const { value } = e.target;
                    setCategorySelect((prevSelect) => {
                      if (e.target.checked) {
                        // Add the category ID to the selected list
                        return [...prevSelect, parseInt(value)]; // Ensure it's a number
                      } else {
                        // Remove the category ID from the selected list
                        return prevSelect.filter(
                          (id) => id !== parseInt(value)
                        );
                      }
                    });
                  }}
                />
              </div>
            ))}
        </div>

        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleSubmit}
        >
          Sign Up
        </button>

        {!isEmployee ? (
          <div className="flex justify-center gap-x-1 text-sm">
            <p className="text-gray-600">Already a user</p>
            <button
              className="font-medium text-gray-800 hover:text-gray-600"
              onClick={navigateToSignInUser}
            >
              Sign In now.
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-x-1 text-sm">
            <p className="text-gray-600">Already a employee?</p>
            <button
              className="font-medium text-gray-800 hover:text-gray-600"
              onClick={navigateToSignInEmployee}
            >
              Sign In now.
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Signup;
