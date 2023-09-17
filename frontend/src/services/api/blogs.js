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
