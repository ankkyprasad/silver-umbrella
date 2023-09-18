import axios from "axios";

export const getBlogs = async () => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/blogs`,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const getBlogWithId = async ({ id }) => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/blogs/${id}`,
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
