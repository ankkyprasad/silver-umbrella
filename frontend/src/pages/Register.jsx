import RegisterForm from "../components/users/RegisterForm";
import { NavLink } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex-1 flex flex-col">
      <div className="text-gray-100 flex-1 flex">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1580130037666-564e0f29cbae?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cover"
            className="w-100 object-cover"
            style={{ height: "100%" }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-1/2">
            <h1 className="text-5xl font-semibold mb-16">Register</h1>
            <RegisterForm />
            <div className="mt-6 text-gray-400">
              Already have an account?{" "}
              <span className="text-blue-500">
                <NavLink to="/login">Sign in</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
