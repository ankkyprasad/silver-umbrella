import { NavLink } from "react-router-dom";

const PATH_ELEMENTS = [
  {
    title: "Register",
    to: "/register",
  },
  {
    title: "Login",
    to: "/login",
  },
  {
    title: "Home",
    to: "/",
  },
];

const Navbar = () => {
  return (
    <nav className="py-6 bg-zinc-950 bg-opacity-95 shadow-sm shadow-gray-700">
      <ul className="flex gap-8 flex-row-reverse w-5/6 m-auto font-semibold text-gray-100">
        {PATH_ELEMENTS.map((pathElement) => (
          <li key={pathElement.to}>
            <NavLink
              to={pathElement.to}
              className={({ isActive }) => {
                return isActive
                  ? "underline underline-offset-2 decoration-blue-600 decoration-2"
                  : "hover:text-gray-300 decoration-blue-400 hover:underline decoration-2 underline-offset-4";
              }}
            >
              {pathElement.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
