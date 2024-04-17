import { useMutation } from "@tanstack/react-query";
import {
  createRelationship,
  destroyRelationship,
} from "../../services/api/relationship";
import queryClient from "../../services/query-client/index";
import LoadingSvg from "../shared/LoadingSvg";

const Follow = ({ followsCurrentUser, followeeId, followeeSlug }) => {
  const createRelationshipMutation = useMutation({
    mutationFn: createRelationship,
    onSuccess: () => {
      queryClient.invalidateQueries(["user_by_slug", followeeSlug]);
    },
  });

  const destroyRelationshipMutation = useMutation({
    mutationFn: destroyRelationship,
    onSuccess: () => {
      queryClient.invalidateQueries(["user_by_slug", followeeSlug]);
    },
  });

  const onClickToggleUseRelationship = () => {
    if (followsCurrentUser) {
      destroyRelationshipMutation.mutate({ followeeId });
    } else {
      createRelationshipMutation.mutate({ followeeId });
    }
  };

  return (
    <button
      className="btn btn-primary rounded-full mt-6 w-24"
      onClick={onClickToggleUseRelationship}
    >
      {createRelationshipMutation.isLoading ||
      destroyRelationshipMutation.isLoading ? (
        <LoadingSvg />
      ) : followsCurrentUser ? (
        "Following"
      ) : (
        "Follow"
      )}
    </button>
  );
};

export default Follow;
