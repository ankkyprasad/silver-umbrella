import axios from "axios";

export const getCategories = async () => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/categories`,
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const addCategories = async ({ categoryIds, blogId }) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/blogs/add_categories`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      data: {
        attributes: {
          category_ids: categoryIds,
          blog_id: blogId,
        },
      },
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};

export const removeCategory = async ({ categoryId, blogId }) => {
  const config = {
    method: "delete",
    url: `${process.env.REACT_APP_URL}/api/v1/blogs/remove_category`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: {
      data: {
        attributes: {
          category_id: categoryId,
          blog_id: blogId,
        },
      },
    },
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    throw error.response;
  }
};
