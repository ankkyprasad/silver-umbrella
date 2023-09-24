import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import LoadingSvg from "../shared/LoadingSvg";
import { createComment } from "../../services/api/comments";
import queryClient from "../../services/query-client/index";

const InputComment = () => {
  const params = useParams();

  const [commentInput, setCommentInput] = useState("");

  const addCommentMutation = useMutation({
    mutationFn: createComment,
    onSuccess: () => {
      setCommentInput("");
      queryClient.invalidateQueries(["comments", "Blog", params.id]);
    },
  });

  const commentButtonHandler = () => {
    const comment = {
      id: params.id,
      type: "Blog",
      content: commentInput,
    };
    addCommentMutation.mutate({ comment });
  };

  return (
    <div className="flex justify-center items-center gap-5">
      <div className="relative h-11 w-full min-w-[200px] my-6 text-gray-200 flex-1">
        <input
          className="peer h-full w-full border-b border-blue-gray-200 bg-transparent pt-4 pb-1.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 focus:border-orange-500 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=" "
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        />
        <label className="after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-500 transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-orange-500 after:transition-transform after:duration-300 peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-orange-500 peer-focus:after:scale-x-100 peer-focus:after:border-orange-500 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          Add Comment
        </label>
      </div>
      <button
        className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none mt-4 ${
          addCommentMutation.isLoading || commentInput.trim() === ""
            ? "cursor-not-allowed bg-blue-800 hover:bg-blue-800"
            : ""
        }`}
        disabled={addCommentMutation.isLoading || commentInput.trim() === ""}
        onClick={commentButtonHandler}
      >
        {addCommentMutation.isLoading ? <LoadingSvg /> : "Comment"}
      </button>
    </div>
  );
};

export default InputComment;
