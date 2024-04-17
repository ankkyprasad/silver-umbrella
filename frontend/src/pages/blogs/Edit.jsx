import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/blogs/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { deleteBlog, editBlog, getBlogWithId } from "../../services/api/blogs";
import LoadingSvg from "../../components/shared/LoadingSvg";
import { useDispatch, useSelector } from "react-redux";
import { revokeTokenThunk } from "../../store/userSlice";
import ErrorCard from "../../components/shared/ErrorCard";
import queryClient from "../../services/query-client";
import SelectCategoryCard from "../../components/categories/SelectCategoryCard";

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogId = params.id;
  const userState = useSelector((state) => state.user.data);

  let blogData = {};
  let errorState = {};

  const blogQuery = useQuery({
    queryKey: ["blogs", blogId],
    queryFn: () =>
      getBlogWithId({
        id: blogId,
      }),
    retry: false,
    refetchOnWindowFocus: false,
  });

  const blogEditMutation = useMutation({
    mutationFn: editBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(["blogs", blogId]);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      navigate(`/profile/${userState.slug}`);
    },
  });

  const deleteButtonHandler = () => {
    deleteMutation.mutate({ id: blogData?.id });
  };

  if (blogQuery.isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LoadingSvg />;
      </div>
    );
  }

  if (blogQuery.isError) {
    switch (blogQuery.error.status) {
      case 401:
        dispatch(revokeTokenThunk());
        break;

      case 404:
        navigate("/error", { state: { message: "Not Found" } });
        break;

      default:
        errorState = {
          header: "Internal Server Error!",
          message: "Please sit tight. It will be fixed soon.",
        };
    }
  } else {
    const data = blogQuery.data.data.data;

    blogData = {
      id: data.id,
      title: data.attributes.title,
      description: data.attributes.description,
      imageUrl: data.attributes["image_url"],
      subHeading: data.attributes["sub_heading"],
      categories: data.attributes.categories,
    };
    if (data.attributes.user_id !== userState.id)
      navigate("/error", { state: { message: "Unauthorized" } });
  }

  const deleteBlogComponent = (
    <button
      className="btn rounded-full bg-red-600 text-gray-100 w-1/3 hover:bg-red-700 flex items-center justify-center"
      onClick={deleteButtonHandler}
      type="button"
      disabled={deleteMutation.isLoading}
    >
      {deleteMutation.isLoading ? <LoadingSvg /> : "Delete"}
    </button>
  );

  return (
    <div className=" mt-6 flex">
      {blogQuery.isError ? (
        <ErrorCard error={errorState} />
      ) : (
        <>
          <div className="w-2/3">
            <div className="shadow-lg border border-gray-200 mx-auto w-2/3 card">
              <div className="card-body">
                <Form
                  blogData={blogData}
                  mutation={blogEditMutation}
                  submitButtonText={"Save"}
                  deleteBlogComponent={deleteBlogComponent}
                />
              </div>
            </div>
          </div>
          <div className="flex-1 mx-16">
            <SelectCategoryCard
              selectedCategories={blogData.categories}
              blogId={blogId}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Edit;
