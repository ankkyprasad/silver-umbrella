import { useMutation } from "@tanstack/react-query";
import { createLike, deleteLike } from "../../services/api/likes";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";

const Like = (props) => {
  const [isLiked, setIsLiked] = useState(props.isLiked);
  const [likesCount, setLikesCount] = useState(props.likesCount);

  const createLikeMutation = useMutation({
    mutationFn: createLike,
    onSuccess: () => {
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    },
  });

  const deleteLikeMutation = useMutation({
    mutationFn: deleteLike,
    onSuccess: () => {
      setIsLiked(false);
      setLikesCount((prev) => prev - 1);
    },
  });

  const onLikeClickHandler = () => {
    const data = {
      id: props.entityId,
      type: props.entityType,
    };

    if (isLiked) deleteLikeMutation.mutate({ data });
    else createLikeMutation.mutate({ data });
  };

  return (
    <div className="flex items-center gap-2 select-none">
      <AiFillLike
        onClick={onLikeClickHandler}
        className={`text-md cursor-pointer ${
          isLiked ? "text-blue-500" : "text-gray-600"
        } `}
      />

      <p className="text-gray-600 text-sm">{likesCount}</p>
    </div>
  );
};

Like.defaultProps = {
  isLiked: false,
  likesCount: 0,
  entityId: null,
  entityType: null,
};

export default Like;
