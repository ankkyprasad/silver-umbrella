import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { displayErrorMessage } from "../store/flashSlice";

const useDisplayErrorFlash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const displayFlash = (errorMessage, route) => {
    dispatch(
      displayErrorMessage({
        header: errorMessage.header,
        message: errorMessage.message,
      })
    );
    navigate(route);
  };

  return displayFlash;
};

export default useDisplayErrorFlash;
