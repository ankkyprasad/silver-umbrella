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
