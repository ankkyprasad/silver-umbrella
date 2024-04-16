import { useMutation } from "@tanstack/react-query";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import LoadingSvg from "../shared/LoadingSvg";
import { createBlog } from "../../services/api/blogs";
import { useDispatch } from "react-redux";
import { revokeTokenThunk } from "../../store/userSlice";
import ErrorCard from "../shared/ErrorCard";

const INITIAL_ROW_COUNT = 10;
const ROW_COUNT_OFFSET = 5;

const Form = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    imageUrl: "",
  });
  const [rowCount, setRowCount] = useState(INITIAL_ROW_COUNT);
  const [errorData, setErrorData] = useState({});

  const inputChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const linesCount = value.split(/\r\n|\r|\n/).length;

    if (key === "description") {
      if (linesCount >= ROW_COUNT_OFFSET) {
        setRowCount(linesCount + ROW_COUNT_OFFSET);
      } else if (rowCount > INITIAL_ROW_COUNT) {
        setRowCount(INITIAL_ROW_COUNT);
      }
    }

    setBlogData((prev) => {
      return { ...prev, [key]: value.trim() };
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
        dispatch(revokeTokenThunk());
      } else if (response.status >= 500) {
        setErrorData({
          header: "Internal Server Error",
          message: "Please Hang tight, it will be fixed soon!",
        });
      }
    },
  });

  const postSubmitHandler = (event) => {
    event.preventDefault();

    createBlogMutation.mutate({ blog: blogData });
  };

  const imageOnErrorHandler = () => {
    setBlogData((prev) => {
      return {
        ...prev,
        imageUrl:
          "https://lightwidget.com/wp-content/uploads/localhost-file-not-found.jpg",
      };
    });
  };

  return (
    <form onSubmit={postSubmitHandler}>
      {createBlogMutation.isError && <ErrorCard error={errorData} />}

      <input
        type="text"
        className="text-3xl outline-none block w-full pl-4 py-3 bg-neutral-100 placeholder-gray-400 font-medium text-gray-700 border-l border-neutral-100 focus:border-gray-400"
        placeholder="Title"
        name="title"
        onChange={inputChangeHandler}
        required
      />

      <input
        type="text"
        className="text-lg outline-none block w-full pl-4 py-1.5 bg-neutral-100 placeholder-gray-400 text-gray-600 border-l border-neutral-100 focus:border-gray-400 mb-4"
        placeholder="Sub Heading"
        name="subHeading"
        onChange={inputChangeHandler}
        required
      />

      <input
        type="text"
        className="text-md outline-none block w-full pl-4 py-1.5 bg-neutral-100 placeholder-gray-400 text-blue-700 border-l border-neutral-100 focus:border-gray-400 my-4"
        placeholder="Banner Image URL"
        name="imageUrl"
        onChange={inputChangeHandler}
        required
      />

      {blogData.imageUrl && (
        <img
          src={blogData.imageUrl}
          style={{ height: "400px", width: "100%" }}
          onError={imageOnErrorHandler}
          className="fit-cover"
        />
      )}

      <textarea
        className="overflow-auto resize-none text-md outline-none block w-full pl-4 py-1.5 bg-neutral-100 placeholder-gray-400 text-gray-700 border-l border-neutral-100 focus:border-gray-400 my-6"
        placeholder="Tell your story..."
        name="description"
        onChange={inputChangeHandler}
        required
        rows={rowCount}
      ></textarea>

      <div className="flex justify-center">
        <button
          className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-600 border border-green-700 rounded-3xl shadow-sm hover:bg-green-700 focus:outline-none w-1/3 mt-4 mb-8 ${
            createBlogMutation.isLoading
              ? "cursor-not-allowed bg-green-800 hover:bg-green-800"
              : ""
          }`}
          type="submit"
          disabled={createBlogMutation.isLoading}
        >
          {createBlogMutation.isLoading ? <LoadingSvg /> : "Publish"}
        </button>
      </div>
    </form>
  );
};

export default Form;
