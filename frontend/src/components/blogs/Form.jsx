import React, { useState } from "react";
import LoadingSvg from "../shared/LoadingSvg";
import "../../utils/stringExtension";

const ROW_COUNT = 10;
const ROW_COUNT_OFFSET = 5;

const Form = (props) => {
  const [blogData, setBlogData] = useState(props.blogData);
  const [currentRowCount, setCurrentRowCount] = useState(
    props.blogData.description === ""
      ? ROW_COUNT
      : props.blogData.description.countLines() + ROW_COUNT_OFFSET
  );

  const inputChangeHandler = (e) => {
    const key = e.target.name;
    const value = e.target.value;
    const linesCount = value.countLines();

    if (key === "description") {
      if (linesCount >= ROW_COUNT_OFFSET) {
        setCurrentRowCount(linesCount + ROW_COUNT_OFFSET);
      } else if (currentRowCount > ROW_COUNT) {
        setCurrentRowCount(ROW_COUNT);
      }
    }

    setBlogData((prev) => {
      return { ...prev, [key]: value };
    });
  };

  const postSubmitHandler = (event) => {
    event.preventDefault();

    props.mutation.mutate({ blog: blogData });
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
      <input
        type="text"
        className="text-3xl outline-none block w-full pl-4 py-3 bg-neutral-100 placeholder-gray-400 font-medium text-gray-700 border-l border-neutral-100 focus:border-gray-400"
        placeholder="Title"
        name="title"
        value={blogData.title}
        onChange={inputChangeHandler}
        required
      />

      <input
        type="text"
        className="text-lg outline-none block w-full pl-4 py-1.5 bg-neutral-100 placeholder-gray-400 text-gray-600 border-l border-neutral-100 focus:border-gray-400 mb-4"
        placeholder="Sub Heading"
        name="subHeading"
        value={blogData.subHeading}
        onChange={inputChangeHandler}
        required={false}
      />

      <input
        type="text"
        className="text-md outline-none block w-full pl-4 py-1.5 bg-neutral-100 placeholder-gray-400 text-blue-700 border-l border-neutral-100 focus:border-gray-400 my-4"
        placeholder="Banner Image URL"
        name="imageUrl"
        value={blogData.imageUrl}
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
        className="text-md outline-none block w-full pl-4 py-1.5 bg-neutral-100 placeholder-gray-400 text-gray-700 border-l border-neutral-100 focus:border-gray-400 my-6"
        placeholder="Tell your story..."
        name="description"
        onChange={inputChangeHandler}
        value={blogData.description}
        required
        rows={currentRowCount}
      ></textarea>

      <div className="flex justify-center mt-6 mb-8 gap-8">
        {props.deleteBlogComponent}

        <button
          className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-green-600 border border-green-700 rounded-3xl shadow-sm hover:bg-green-700 focus:outline-none w-1/3 ${
            props.mutation.isLoading
              ? "cursor-not-allowed bg-green-800 hover:bg-green-800"
              : ""
          }`}
          type="submit"
          disabled={props.mutation.isLoading}
        >
          {props.mutation.isLoading ? <LoadingSvg /> : props.submitButtonText}
        </button>
      </div>
    </form>
  );
};

Form.defaultProps = {
  blogData: {
    title: "",
    description: "",
    imageUrl: "",
    subHeading: "",
  },
  mutation: null,
  submitButtonText: "",
};

export default Form;
