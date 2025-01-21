import { useSelector } from "react-redux";
import Header from "./Header";
import useUserInfo from "../hooks/useUserInfo";

const UserProfile = () => {
  useUserInfo(); //getting user info through this hook(api call in it)

  const userData = useSelector((store) => store.user.userProfile);

  if (!userData) return;

  const { user, address } = userData;

  return (
    <div>
      <Header />
      <div className="bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="bg-white shadow-lg rounded-lg w-full max-w-3xl px-8 py-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            User Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
                placeholder={user.first_name + " " + user.last_name}
                defaultValue={user.first_name + " " + user.last_name}
              />
            </div>
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                type="text"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
                placeholder={user.username}
                defaultValue={user.username}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:border-transparent"
                placeholder={user.email}
                defaultValue={user.email}
              />
            </div>
            <div>
              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                address
              </label>
              <textarea
                id="address"
                rows="4"
                className="mt-1 block w-full px-4 py-3 bg-gray-50 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-aqua-500 focus:border-transparent resize-none"
                placeholder={address}
                defaultValue={address}
              ></textarea>
            </div>
          </div>
          <div className="flex justify-end mt-8">
            <button className="bg-blue-500 hover:bg-aqua-600 text-white px-6 py-3 rounded-md font-medium">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
