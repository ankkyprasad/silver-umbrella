import LoginForm from "../components/users/LoginForm";

const Login = () => {
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
