import { NavLink } from "react-router-dom";
import UserAvatar from "../users/UserAvatar";

const FollowUser = ({ readTime, publishedDate, authorName, userId }) => {
  return (
    <div className="w-full flex items-center gap-x-4">
      {/* redirect to user profile on click image */}
      <NavLink>
        <UserAvatar />
      </NavLink>

      <div>
        <div className="text-gray-700">
          <span>{authorName} · </span>
          <button className="cursor-pointer text-indigo-500 hover:text-indigo-700">
            Follow
          </button>
        </div>
        <div className="text-gray-500">
          {readTime} min read · {publishedDate}
        </div>
      </div>
    </div>
  );
};

export default FollowUser;
