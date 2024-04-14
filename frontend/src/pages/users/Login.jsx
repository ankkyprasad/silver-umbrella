import LoginForm from "../../components/users/LoginForm";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex-1 flex flex-col bg-black">
      <div className="text-gray-100 flex-1 flex">
        <div className="flex-1">
          <img
            src="https://images.unsplash.com/photo-1457369804613-52c61a468e7d?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Cover"
            className="w-100 object-cover"
            style={{ height: "100%" }}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center items-center">
          <div className="w-1/2">
            <h1 className="text-5xl font-semibold mb-16">Log in</h1>
            <LoginForm />
            <div className="mt-6 text-gray-400">
              Don't have an account?{" "}
              <span className="text-blue-500">
                <NavLink to="/register">Sign up</NavLink>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
