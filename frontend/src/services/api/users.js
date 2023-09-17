import axios from "axios";

export const loginUser = async ({ email, password }) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/users/tokens/sign_in`,
    data: {
      email,
      password,
    },
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const registerUser = async (data) => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/users/tokens/sign_up`,
    data,
  };

  try {
    const response = await axios(config);
    return response;
  } catch (error) {
    throw error.response;
  }
};

export const tokenStatus = async () => {
  const config = {
    method: "get",
    url: `${process.env.REACT_APP_URL}/api/v1/users/tokens/info`,
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

export const revokeToken = async () => {
  const config = {
    method: "post",
    url: `${process.env.REACT_APP_URL}/api/v1/users/tokens/revoke`,
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
