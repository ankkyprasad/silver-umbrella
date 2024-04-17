import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div>
      <h1 className="text-3xl font-bold">{location.state.message}</h1>
    </div>
  );
};

export default NotFound;
