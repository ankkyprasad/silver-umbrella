import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

import Loading from "../../components/shared/LoadingSvg";

import { getBlogWithId } from "../../services/api/blogs";
import { displayErrorMessage } from "../../store/flashSlice";

const Show = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();

  const blogQuery = useQuery({
    queryKey: ["blogs", params.id],
    queryFn: () =>
      getBlogWithId({
        id: params.id,
      }),
    retry: false,
  });

  useEffect(() => {
    if (blogQuery.isError) {
      switch (blogQuery.error.status) {
        case 401:
          dispatch(
            displayErrorMessage({
              header: "Unauthorized!!",
              message: "You need to login first.",
            })
          );
          navigate("/login");
          break;

        case 404:
          dispatch(
            displayErrorMessage({
              header: "Not Found",
              message: "The blog you're trying to find does not exist",
            })
          );
          navigate("/");
          break;

        default:
          dispatch(
            displayErrorMessage({
              header: "Internal Server Error!",
              message: "Please sit tight. It will be fixed soon.",
            })
          );
          navigate("/");
          break;
      }
    }
  });

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

  return (
    <div className="w-2/3 mx-auto">
      <img
        src={data.attributes["image-url"]}
        className="w-full object-cover rounded-md my-8"
      />

      <h1 className="text-3xl font-bold text-gray-200">
        {data.attributes.title}
      </h1>

      <p className="text-gray-300 mt-5 mb-8 font-semibold text-justify">
        {data.attributes.description}
      </p>
    </div>
  );
};

export default Show;
