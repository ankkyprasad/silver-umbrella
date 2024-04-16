import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { VscKebabVertical } from "react-icons/vsc";
import { useParams } from "react-router-dom";
import { deleteComment } from "../../services/api/comments";
import queryClient from "../../services/query-client";
import UserAvatar from "../users/UserAvatar";
import Like from "../shared/Like";

const Card = ({ comment, id }) => {
  const {
    commenter_name: username,
    published_time_text: publishedTime,
    published_by_user: publishedByUser,
    content,
  } = comment;

  const params = useParams();
  const [displayDropdown, setDisplayDropdown] = useState(false);

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "Blog", params.id],
      });
    },
  });

  const dropdownClickHandler = () => {
    setDisplayDropdown((prev) => !prev);
  };

  const deleteCommentHandler = () => {
    deleteCommentMutation.mutate({ id });
  };

  return (
    <div className="mb-4 py-3 flex justify-between border-t border-gray-200">
      <div>
        <div className="mb-2 flex gap-4 items-center">
          <UserAvatar />
          <div>
            <h4 className="text-gray-800 font-semibold font-mono">
              {username}
            </h4>
            <p className="text-xs text-gray-500">{publishedTime}</p>
          </div>
        </div>
        <p className="text-gray-700 font-light text-sm mt-3">{content}</p>

        <div className="mt-1.5">
          <Like
            likesCount={comment.likes}
            entityType="Comment"
            entityId={id}
            isLiked={comment.liked_by_user}
          />
        </div>
      </div>

      <div className="relative">
        <VscKebabVertical
          className="cursor-pointer text-lg select-none"
          onClick={dropdownClickHandler}
        />
        <ul
          className={`bg-base-100 p-0 [&_li>*]:rounded-none shadow-lg text-gray-700 text-md border border-gray-200 rounded mt-1  absolute right-0 ${
            displayDropdown ? "" : "hidden"
          }`}
        >
          <li className="hover:bg-gray-200 px-4 py-2 cursor-pointer">Report</li>

          {publishedByUser && (
            <li
              className={`px-4 py-2 ${
                deleteCommentMutation.isLoading
                  ? "cursor-wait hover:bg-none"
                  : "cursor-pointer hover:bg-gray-200"
              }`}
              onClick={deleteCommentHandler}
            >
              Delete
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Card;
