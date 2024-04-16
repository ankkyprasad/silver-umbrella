import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import { useMutation } from "@tanstack/react-query";

import LoadingSvg from "../shared/LoadingSvg";
import { createComment } from "../../services/api/comments";
import queryClient from "../../services/query-client/index";
import UserAvatar from "../users/UserAvatar";

const InputComment = () => {
  const params = useParams();
  const userState = useSelector((state) => state.user);
  const [commentInput, setCommentInput] = useState("");

  const addCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setCommentInput("");
      queryClient.invalidateQueries(["comments", "Blog", params.id]);
    },
  });

  const commentButtonHandler = (e) => {
    e.preventDefault();

    const comment = {
      id: params.id,
      type: "Blog",
      content: commentInput,
    };
    addCommentMutation.mutate({ comment });
  };

  return (
    <div className="bg-base-100 shadow-lg my-5 px-4 py-4 rounded-lg border border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <UserAvatar />
        <div className="text-md text-gray-700">{userState.data.name}</div>
      </div>
      <form onSubmit={commentButtonHandler}>
        <div className="relative h-11 w-full">
          <input
            className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-gray-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 text-gray-700"
            placeholder=" "
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
            required={true}
          />
          <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-gray-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-500 peer-focus:after:scale-x-100 peer-focus:after:border-gray-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 text-gray-500">
            What are your thoughts?
          </label>
        </div>

        <button
          className={`flex w-full justify-center items-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-600 rounded-full shadow-sm hover:bg-green-700 focus:outline-none mt-4  ${
            addCommentMutation.isLoading
              ? "cursor-not-allowed hover:bg-green-600"
              : ""
          }`}
          disabled={addCommentMutation.isLoading}
          type="submit"
        >
          {addCommentMutation.isLoading ? <LoadingSvg /> : "Comment"}
        </button>
      </form>
    </div>
  );
};

export default InputComment;
