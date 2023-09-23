import axios from "axios";

export const getBlogs = async ({ pageNumber, pageSize }) => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/blogs?page[number]=${pageNumber}`,
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

export const createBlog = async ({ blog }) => {
  const { title, description, imageUrl } = blog;

  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/blogs`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/vnd.api+json",
    },
    data: {
      data: {
        attributes: {
          title,
          description,
          image_url: imageUrl,
        },
        type: "blogs",
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

export const deleteBlog = async ({ id }) => {
  const config = {
    method: "delete",
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
