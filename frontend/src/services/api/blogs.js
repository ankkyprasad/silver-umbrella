import axios from "axios";

export const getBlogs = async ({ pageNumber }) => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/blogs?page[number]=${pageNumber}`,
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
  const { title, description, imageUrl, subHeading } = blog;

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
          sub_heading: subHeading,
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
