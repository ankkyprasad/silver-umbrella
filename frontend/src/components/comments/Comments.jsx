import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Card from "./Card";
import LoadingSvg from "../shared/LoadingSvg";
import { FaRegComment } from "react-icons/fa";
import InputComment from "./InputComment";

import { getComments } from "../../services/api/comments";

const Comments = () => {
  const params = useParams();

  const commentQuery = useQuery({
    queryKey: ["comments", "Blog", params.id],
    queryFn: () => getComments({ pageNumber: params.id }),
    retry: false,
  });

  let commentCards = [];

  if (commentQuery.isLoading === false && commentQuery.isError === false) {
    const commentsData = commentQuery.data.data.data;

    commentCards = commentsData.map((comment) => (
      <Card key={comment.id} comment={comment.attributes} id={comment.id} />
    ));
  }

  return (
    <>
      <div className="drawer drawer-end">
        <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <label htmlFor="my-drawer-4" className="drawer-button cursor-pointer">
            <FaRegComment />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-4"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>

          <div className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            <h1 className="text-xl font-bold">Responses</h1>
            <InputComment />
            <div className="mt-5">
              {commentQuery.isLoading && <LoadingSvg />}

              {commentCards}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Comments;
