import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { revokeToken } from "../../services/api/users";
import { revokeTokenThunk } from "../../store/userSlice";
import { useState } from "react";
import Search from "../svg/Search";
import LoadingSvg from "../shared/LoadingSvg";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const userState = useSelector((state) => state.user);

  const logoutMutation = useMutation({
    mutationFn: revokeToken,
    onSuccess: () => {
      dispatch(revokeTokenThunk());
      navigate("/");
    },
  });

  const logoutClickHandler = () => {
    logoutMutation.mutate();
  };

  return (
    <nav className="py-2 shadow-sm sticky top-0 z-50 bg-gray-100 border-b border-b-zinc-300">
      <div className="mx-10 flex justify-between items-center">
        <div className="flex items-center gap-6">
          <NavLink to="/">
            <img
              src="https://lordicon.com/icons/wired/lineal/1685-beach-umbrella.svg"
              alt="Logo"
              style={{ height: "50px" }}
              className="inline"
            />
          </NavLink>

          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <Search />
            </div>

            <input
              type="search"
              className="p-2 ps-10 text-sm text-gray-900 border-2 border-gray-200 rounded-3xl bg-gray-200 focus:border-2 focus:border-blue-500 outline-none"
              placeholder="Search"
              required
            />
          </div>
        </div>

        <ul className="flex gap-4">
          <li>
            <NavLink to="/blogs/create">Create Blog</NavLink>
          </li>

          <li>
            <img
              src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=ais"
              alt="Avatar"
              style={{ height: "30px", width: "30px" }}
              className="rounded-xl cursor-pointer"
              onClick={() => setShowDropdown((prev) => !prev)}
            />

            <div
              className={`z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-lg w-44 absolute right-10 top-16 ${
                showDropdown ? "" : "hidden"
              }`}
            >
              <div className="px-4 py-3 text-sm">
                <div className="text-gray-800 font-bold">Bonnie Green</div>
                <div className="font-semibold truncate text-gray-600">
                  {userState.data.email}
                </div>
              </div>
              <ul className="py-2 text-sm text-gray-600 font-normal">
                {["Profile", "Library", "Stories"].map((item) => (
                  <DropDownItem title={item} />
                ))}
              </ul>
              <div className="py-2">
                <p
                  className="block px-4 py-2 text-sm text-gray-600 font-normal hover:bg-gray-100 w-full cursor-pointer"
                  onClick={logoutClickHandler}
                >
                  {logoutMutation.isLoading ? (
                    <div className="flex items-center justify-center">
                      <LoadingSvg />
                    </div>
                  ) : (
                    "Sign out"
                  )}
                </p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  );
};

const DropDownItem = ({ title }) => {
  return (
    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">{title}</li>
  );
};

export default Navbar;
