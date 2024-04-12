import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

import Loading from "../../components/shared/LoadingSvg";
import Comments from "../../components/comments/Comments";
import InputComment from "../../components/comments/InputComment";

import { getBlogWithId, deleteBlog } from "../../services/api/blogs";

const Show = () => {
  const params = useParams();
  const navigate = useNavigate();

  const userState = useSelector((state) => state.user);
  const userData = userState.data;

  const blogQuery = useQuery({
    queryKey: ["blogs", params.id],
    queryFn: () =>
      getBlogWithId({
        id: params.id,
      }),
    retry: false,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      navigate("/");
    },
  });

  // TODO: Handle errors

  // useEffect(() => {
  //   if (blogQuery.isError) {
  //     blogQueryErrorHandler(blogQuery, displayFlashMessage);
  //   }
  // }, [blogQuery, blogQuery.isError, displayFlashMessage]);

  if (blogQuery.isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />;
      </div>
    );
  }

  if (blogQuery.isError) {
    return <></>;
  }

  const data = blogQuery.data.data.data;

  const deleteButtonHandler = () => {
    deleteMutation.mutate({ id: data.id });
  };

  return (
    <div className="w-2/3 mx-auto">
      <img
        src={data.attributes["image_url"]}
        className="w-full object-cover rounded-md my-8"
        alt={data.attributes.title}
      />

      <h1 className="text-3xl font-bold text-gray-200">
        {data.attributes.title}
      </h1>

      <div className="mt-5 mb-8 text-justify">
        <ReactMarkdown className="prose prose-invert max-w-none">
          {data.attributes.description}
        </ReactMarkdown>
      </div>

      {userData.id === data.attributes["user_id"] && (
        <button
          className={`inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-red-600 border border-red-700 rounded-md shadow-sm hover:bg-red-700 focus:outline-none w-full my-4 ${
            deleteMutation.isLoading
              ? "cursor-not-allowed bg-red-800 hover:bg-red-800"
              : ""
          }`}
          onClick={deleteButtonHandler}
        >
          {deleteMutation.isLoading ? <Loading /> : "Delete"}
        </button>
      )}

      <div>
        <h1 className="text-blue-500 text-2xl font-bold mt-6">Comments</h1>
        <InputComment />
        <Comments />
      </div>
    </div>
  );
};

function blogQueryErrorHandler(blogQuery, displayFlashMessage) {
  switch (blogQuery.error.status) {
    case 401:
      displayFlashMessage(
        {
          header: "Unauthorized!!",
          message: "You need to login first.",
        },
        "/login"
      );
      break;

    case 404:
      displayFlashMessage(
        {
          header: "Not Found",
          message: "The blog you're trying to find does not exist",
        },
        "/"
      );
      break;

    default:
      displayFlashMessage(
        {
          header: "Internal Server Error!",
          message: "Please sit tight. It will be fixed soon.",
        },
        "/"
      );
      break;
  }
}

export default Show;
