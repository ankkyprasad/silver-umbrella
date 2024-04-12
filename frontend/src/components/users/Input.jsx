const Input = ({ placeholder, value, setValue, type, label }) => {
  const onChangeHandler = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <label className="block mb-3 text-md font-medium text-gray-200">
        {label}
      </label>

      <input
        type={type}
        className="border-2 border-zinc-800 text-gray-300 text-md rounded-lg block w-full px-4 py-3 bg-zinc-900 placeholder-zinc-600 outline-none focus:border-blue-500 focus:border-2"
        placeholder={placeholder}
        value={value}
        onChange={onChangeHandler}
      />
    </>
  );
};

export default Input;
