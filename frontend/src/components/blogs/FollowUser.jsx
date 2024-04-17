import useRedirectToUserProfile from "../../hooks/useRedirectToUserProfile";
import UserAvatar from "../users/UserAvatar";

const FollowUser = ({ readTime, publishedDate, authorName, userId }) => {
  const redirectToUserProfile = useRedirectToUserProfile(userId);

  const onClickHandler = () => {
    redirectToUserProfile();
  };

  return (
    <div className="w-full flex items-center gap-x-4">
      <UserAvatar enableRedirect={true} userId={userId} />

      <div>
        <div
          className="hover:underline cursor-pointer select-none"
          onClick={onClickHandler}
        >
          {authorName}
        </div>

        <div className="text-gray-500">
          {readTime} min read · {publishedDate}
        </div>
      </div>
    </div>
  );
};

export default FollowUser;
