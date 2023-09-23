import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSvg from "../shared/LoadingSvg";
import { createBlog } from "../../services/api/blogs";
import useDisplayErrorFlash from "../../hooks/useDisplayErrorFlash";

const Form = (props) => {
  const navigate = useNavigate();
  const displayFlash = useDisplayErrorFlash();
  const [blogData, setBlogData] = useState(props.initialBlogData);

  const inputChangeHandler = (e) => {
    setBlogData((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (response) => {
      const blogId = response.data.data.id;
      navigate(`/blogs/${blogId}`);
    },
    onError: (response) => {
      if (response.status === 401) {
        const errorMessage = {
          header: "Unauthorized!!",
          message: "You need to login first.",
        };
        displayFlash(errorMessage, "/login");
      }
    },
  });

  const postSubmitHandler = (event) => {
    event.preventDefault();

    createBlogMutation.mutate({ blog: blogData });
  };

  return (
    <form onSubmit={postSubmitHandler}>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-white">
          Title
        </label>
        <input
          type="text"
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Title"
          name="title"
          onChange={inputChangeHandler}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-white">
          Banner URL
        </label>
        <input
          type="text"
          className="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="..."
          name="imageUrl"
          onChange={inputChangeHandler}
          required
        />
      </div>
      <div className="mb-6">
        <label className="block mb-2 text-sm font-medium text-white">
          Description
        </label>
        <textarea
          rows="4"
          className="block p-2.5 w-full text-sm rounded-lg border focus:ring-blue-500 focus:border-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 text-white"
          placeholder="Description"
          name="description"
          onChange={inputChangeHandler}
          required
        ></textarea>
      </div>
      <button
        className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none w-full mt-4 ${
          createBlogMutation.isLoading
            ? "cursor-not-allowed bg-blue-800 hover:bg-blue-800"
            : ""
        }`}
        type="submit"
        disabled={createBlogMutation.isLoading}
      >
        {createBlogMutation.isLoading ? <LoadingSvg /> : "Post"}
      </button>
    </form>
  );
};

Form.defaultProps = {
  initialBlogData: {
    title: "",
    description: "",
    imageUrl: "",
  },
};

export default Form;
