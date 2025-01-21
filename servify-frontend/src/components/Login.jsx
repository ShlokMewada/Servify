import axiosInstance, {
  axiosUnauthenticatedInstance,
} from "../utils/axiosInstance";
import { useRef, useState } from "react";
import { checkValidDataSignIn } from "../utils/validate";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { addUser } from "../utils/userSlice";
import { useDispatch } from "react-redux";

const Login = ({ isEmployee }) => {
  const email = useRef();
  const password = useRef();
  const [emailErrorMsg, setEmailErrorMsg] = useState();
  const [passwordErrorMsg, setPasswordErrorMsg] = useState();

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const navigateToSignUpUser = () => {
    navigate("/signup");
  };

  const navigateToSignUpEmployee = () => {
    navigate("/employee/signup");
  };

  const handleSubmit = async () => {

    const message = checkValidDataSignIn(
      email.current.value,
      password.current.value
    );

    setEmailErrorMsg(message.emailMsg);
    setPasswordErrorMsg(message.passwordMsg);

    if (message.emailMsg !== "" || message.passwordMsg !== "") {
      return;
    }
    const formData = new FormData();
    formData.append("email", email.current.value);
    formData.append("password", password.current.value);

    await axiosUnauthenticatedInstance
      .post("http://localhost:8000/login/", formData)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        localStorage.setItem("user_id", response.data.user_id);
        isEmployee &&
          localStorage.setItem("employee_id", response.data.employee_id);
        console.log(response.data);
        dispatch(addUser(response.data.is_employee));
        toast.success("Successfully Logged In!");
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        toast.error(error.response.data.error);
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <form
        className="w-full max-w-md p-8 bg-white shadow-2xl rounded-lg space-y-6"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-900 mb-6">
          Sign In
        </h2>

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

        <button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={handleSubmit}
        >
          Sign In
        </button>

        {!isEmployee ? (
          <div className="flex justify-center gap-x-1 text-sm">
            <p className="text-gray-600">New to Servify?</p>
            <button
              className="font-medium text-gray-800 hover:text-gray-600"
              onClick={navigateToSignUpUser}
            >
              Sign Up now.
            </button>
          </div>
        ) : (
          <div className="flex justify-center gap-x-1 text-sm">
            <p className="text-gray-600">New Employee?</p>
            <button
              className="font-medium text-gray-800 hover:text-gray-600"
              onClick={navigateToSignUpEmployee}
            >
              Sign Up now.
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default Login;
