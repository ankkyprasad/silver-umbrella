import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import LoginForm from "../components/users/LoginForm";
import { useEffect } from "react";

const Login = () => {
  const userState = useSelector((state) => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (userState.isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <div className="flex-1 flex flex-col">
        <div className="text-gray-100 flex-1 flex flex-col justify-center w-1/4 m-auto">
          <LoginForm />
        </div>
      </div>
    </>
  );
};

export default Login;
