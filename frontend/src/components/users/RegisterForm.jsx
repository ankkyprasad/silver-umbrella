import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Input from "./Input";
import LoadingSvg from "../shared/LoadingSvg";
import MultipleErrorCard from "../shared/MultipleErrorCard";

import { registerUser } from "../../services/api/users";
import { userSliceActions } from "../../store/userSlice";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: registerUser,
    onError: (response) => {
      setErrors(response.data.error_description);
    },
    onSuccess: (response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);

      const userData = response.data.resource_owner;
      dispatch(userSliceActions.loginUser({ userData }));
      navigate("/");
    },
  });

  const registerSubmitHandler = (event) => {
    event.preventDefault();

    registerMutation.mutate({ name, email, password });
  };

  return (
    <>
      {registerMutation.isError && <MultipleErrorCard errors={errors} />}
      <form onSubmit={registerSubmitHandler}>
        <div className="my-5">
          <Input
            placeholder="Name"
            value={name}
            setValue={setName}
            type="text"
          />
        </div>
        <div className="my-5">
          <Input
            placeholder="Email"
            value={email}
            setValue={setEmail}
            type="email"
          />
        </div>
        <div className="my-5">
          <Input
            placeholder="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />
        </div>
        <button
          className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none w-full mt-4 ${
            registerMutation.isLoading
              ? "cursor-not-allowed bg-blue-800 hover:bg-blue-800"
              : ""
          }`}
          type="submit"
          disabled={registerMutation.isLoading}
        >
          {registerMutation.isLoading ? <LoadingSvg /> : "Register"}
        </button>
      </form>
    </>
  );
};

export default RegisterForm;
