import axios from "axios";

export const createLike = async ({ data }) => {
  const { id, type } = data;

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/likes`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/vnd.api+json",
    },
    data: {
      data: {
        attributes: {
          likable_id: id,
          likable_type: type,
        },
        type: "likes",
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

export const deleteLike = async ({ data }) => {
  const { id, type } = data;

  const config = {
    method: "delete",
    url: `${process.env.REACT_APP_URL}/api/v1/likes/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/vnd.api+json",
    },
    data: {
      data: {
        attributes: {
          likable_type: type,
        },
        type: "likes",
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
