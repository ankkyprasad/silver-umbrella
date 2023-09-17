import useRedirectIfLoggedIn from "../hooks/useRedirectIfLoggedIn";

import RegisterForm from "../components/users/RegisterForm";

const Register = () => {
  useRedirectIfLoggedIn();

  return (
    <div className="flex-1 flex flex-col">
      <div className="text-gray-100 flex-1 flex flex-col justify-center w-1/4 m-auto">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Register;
