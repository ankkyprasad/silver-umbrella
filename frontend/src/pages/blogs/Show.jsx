import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import ReactMarkdown from "react-markdown";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { MdOutlinePlayCircle } from "react-icons/md";

import Loading from "../../components/shared/LoadingSvg";
import Comments from "../../components/comments/Comments";
import FollowUser from "../../components/blogs/FollowUser";

import { getBlogWithId } from "../../services/api/blogs";
import { useDispatch } from "react-redux";
import ErrorCard from "../../components/shared/ErrorCard";
import { revokeTokenThunk } from "../../store/userSlice";

const Show = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const blogQuery = useQuery({
    queryKey: ["blogs", params.id],
    queryFn: () =>
      getBlogWithId({
        id: params.id,
      }),
    retry: false,
  });

  if (blogQuery.isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />;
      </div>
    );
  }

  let data = null;
  let errorState = null;

  if (blogQuery.isError) {
    switch (blogQuery.error.status) {
      case 401:
        dispatch(revokeTokenThunk());
        break;

      case 404:
        navigate("/not-found");
        break;

      default:
        errorState = {
          header: "Internal Server Error!",
          message: "Please sit tight. It will be fixed soon.",
        };
    }
  } else {
    data = blogQuery.data.data.data;
  }

  return (
    <div className="w-1/2 px-32 mx-auto">
      <div className="mt-4">
        {blogQuery.isError && <ErrorCard error={errorState} />}
      </div>

      {data && (
        <>
          <h1 className="text-4xl font-extrabold mt-16 text-justify">
            {data.attributes.title}
          </h1>

          <h3 className="text-2xl text-gray-500 mt-3 text-justify">
            {data.attributes["sub_heading"]}
          </h3>

          <div className="my-8">
            <FollowUser
              authorName={data.attributes["author_name"]}
              readTime={data.attributes["read_time"]}
              publishedDate={data.attributes["published_date"]}
              userId={data.attributes["user_id"]}
            />
          </div>

          <div className="border-t border-b border-gray-200 py-3 px-4 flex justify-between text-lg">
            <div className="flex gap-6 items-center">
              <div className="flex items-center gap-2">
                <AiOutlineLike className="cursor-pointer inline" />
                <span className="text-sm">
                  {data.attributes["likes_count"]}
                </span>
              </div>
              <Comments />
            </div>

            <div className="flex gap-6">
              <MdOutlineBookmarkAdd className="cursor-pointer" />
              <MdOutlinePlayCircle className="cursor-pointer" />
            </div>
          </div>

          <img
            src={data.attributes["image_url"]}
            className="w-full object-cover my-10"
            alt={data.attributes.title}
          />

          <div className="mt-5 mb-8 text-justify">
            <ReactMarkdown className="max-w-none">
              {data.attributes.description}
            </ReactMarkdown>
          </div>
        </>
      )}
    </div>
  );
};

export default Show;
