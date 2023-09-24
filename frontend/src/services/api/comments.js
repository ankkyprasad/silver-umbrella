import axios from "axios";

export const getComments = async ({ pageNumber }) => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/comments?filter[commentable_type]=Blog&filter[commentable_id]=${pageNumber}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const deleteComment = async ({ id }) => {
  const config = {
    method: "delete",
    url: `${process.env.REACT_APP_URL}/api/v1/comments/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};
