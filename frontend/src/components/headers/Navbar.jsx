import { useMutation } from "@tanstack/react-query";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

import { revokeToken } from "../../services/api/users";
import { revokeTokenThunk } from "../../store/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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

  const isActiveCallback = ({ isActive }) => {
    return isActive
      ? "underline underline-offset-2 decoration-blue-600 decoration-2"
      : "hover:text-gray-300 decoration-blue-400 hover:underline decoration-2 underline-offset-4";
  };

  return (
    <nav className="py-6 bg-zinc-950 bg-opacity-95 shadow-sm shadow-gray-700">
      <ul className="flex gap-8 flex-row-reverse w-5/6 m-auto font-semibold text-gray-100">
        {userState.isLoggedIn ? (
          <li>
            <button
              className="hover:text-gray-300 decoration-blue-400 hover:underline decoration-2 underline-offset-4"
              onClick={logoutClickHandler}
            >
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <NavLink to="/register" className={isActiveCallback}>
                Register
              </NavLink>
            </li>
            <li>
              <NavLink to="/login" className={isActiveCallback}>
                Login
              </NavLink>
            </li>
          </>
        )}
        <li>
          <NavLink to="/" className={isActiveCallback}>
            Home
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
