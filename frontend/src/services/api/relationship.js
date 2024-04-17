import axios from "axios";

export const createRelationship = async ({ followeeId }) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/relationships`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/vnd.api+json",
    },
    data: {
      data: {
        attributes: {
          followee_id: followeeId,
        },
        type: "relationships",
      },
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const destroyRelationship = async ({ followeeId }) => {
  const config = {
    method: "delete",
    url: `${process.env.REACT_APP_URL}/api/v1/relationships`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/vnd.api+json",
    },
    data: {
      data: {
        attributes: {
          followee_id: followeeId,
        },
        type: "relationships",
      },
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};
