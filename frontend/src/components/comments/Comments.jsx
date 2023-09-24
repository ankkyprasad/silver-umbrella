import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import Card from "./Card";
import Loading from "../shared/LoadingSvg";

import { getComments } from "../../services/api/comments";

const Comments = () => {
  const params = useParams();

  const commentQuery = useQuery({
    queryKey: ["comments", "Blog", params.id],
    queryFn: () => getComments({ pageNumber: params.id }),
    retry: false,
  });

  if (commentQuery.isLoading) {
    return <Loading />;
  }

  const commentsData = commentQuery.data.data.data;

  const commentsCard = commentsData.map((comment) => (
    <Card key={comment.id} comment={comment.attributes} id={comment.id} />
  ));

  return <>{commentsCard}</>;
};

export default Comments;
