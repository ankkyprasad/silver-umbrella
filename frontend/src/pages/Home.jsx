import { useSelector } from "react-redux";

const Home = () => {
  const userState = useSelector((state) => state.user);

  return (
    <div>
      Home
      <div>{userState.isLoggedIn}</div>
    </div>
  );
};

export default Home;
