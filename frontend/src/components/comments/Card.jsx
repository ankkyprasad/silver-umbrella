import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { VscKebabVertical } from "react-icons/vsc";
import { AiFillLike } from "react-icons/ai";
import { useParams } from "react-router-dom";

import { deleteComment } from "../../services/api/comments";
import queryClient from "../../services/query-client";

const Card = ({ comment, id }) => {
  const {
    commenter_name: username,
    liked_by_user: likedByUser,
    published_time_text: publishedTime,
    published_by_user: publishedByUser,
    content,
    likes,
  } = comment;

  const params = useParams();

  const deleteCommentMutation = useMutation({
    mutationFn: deleteComment,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "Blog", params.id],
      });
    },
  });

  const [displayDropdown, setDisplayDropdown] = useState(false);
  const dropdownClickHandler = () => {
    setDisplayDropdown((prev) => !prev);
  };

  const likeButtonClickHandler = () => {
    // like the comment if not liked
    // unlike if already liked
  };

  const deleteCommentHandler = () => {
    deleteCommentMutation.mutate({ id });
  };

  return (
    <div className="border rounded-md my-5 border-gray-600 hover:border-gray-500 pr-8 py-3 flex justify-between">
      <div className="flex flex-row gap-5">
        <div className="ml-4 flex items-center justify-center flex-col gap-1">
          <AiFillLike
            onClick={likeButtonClickHandler}
            className={`text-4xl cursor-pointer ${
              likedByUser ? "text-blue-500" : "text-white"
            } `}
          />
          <p className="text-gray-300 text-xs">{likes}</p>
        </div>
        <div>
          <div className="mb-2">
            <h4 className="text-gray-200 font-semibold font-mono">
              {username}
            </h4>
            <p className="text-xs text-gray-500">{publishedTime}</p>
          </div>
          <p className="text-gray-300 font-light text-sm mt-3">{content}</p>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <VscKebabVertical
          className="cursor-pointer text-white text-lg select-none"
          onClick={dropdownClickHandler}
        />
        <ul
          className={`text-gray-400 text-xs border border-gray-700 rounded mt-1 select-none	 ${
            displayDropdown ? "" : "hidden"
          }`}
        >
          <li className="hover:bg-zinc-900 py-1 rounded cursor-pointer px-2">
            Report
          </li>
          {publishedByUser && (
            <li
              className={`hover:bg-gray-900 py-1 rounded px-2 ${
                deleteCommentMutation.isLoading
                  ? "cursor-wait"
                  : "cursor-pointer"
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
