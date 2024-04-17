import { findSlugById } from "../services/api/users";
import { useNavigate } from "react-router-dom";

const useRedirectToUserProfile = (userId) => {
  const navigate = useNavigate();

  return async () => {
    navigate("/loading");
    const response = await findSlugById({ userId });

    if (response.status === 200) {
      const slug = response.data.data.slug;
      navigate(`/profile/${slug}`, { replace: true });
    } else if (response.status === 404) {
      navigate("/error", { state: { message: "Not Found" }, replace: true });
    } else {
      navigate("/error", {
        state: { message: "Internal Server Error" },
        replace: true,
      });
    }
  };
};

export default useRedirectToUserProfile;
