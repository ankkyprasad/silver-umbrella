import { useState } from "react";
import Input from "./Input";

const RegisterForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerSubmitHandler = (event) => {
    event.preventDefault();
  };

  return (
    <form onSubmit={registerSubmitHandler}>
      <div className="my-5">
        <Input placeholder="Name" value={name} setValue={setName} type="text" />
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
        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none w-full mt-4"
        type="submit"
      >
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
