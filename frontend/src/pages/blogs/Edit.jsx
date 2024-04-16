import { useNavigate, useParams } from "react-router-dom";
import Form from "../../components/blogs/Form";
import { useMutation, useQuery } from "@tanstack/react-query";
import { editBlog, getBlogWithId } from "../../services/api/blogs";
import LoadingSvg from "../../components/shared/LoadingSvg";
import { useDispatch, useSelector } from "react-redux";

import { revokeTokenThunk } from "../../store/userSlice";
import ErrorCard from "../../components/shared/ErrorCard";

const Edit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const blogId = params.id;
  const userState = useSelector((state) => state.user.data);

  const blogQuery = useQuery({
    queryKey: ["blogs", blogId],
    queryFn: () =>
      getBlogWithId({
        id: blogId,
      }),
    retry: false,
  });

  const blogEditMutation = useMutation({
    mutationFn: editBlog,
    onSuccess: () => {
      console.log("edit success");
    },
    onError: () => {
      console.log("error editing blog");
    },
  });

  if (blogQuery.isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <LoadingSvg />;
      </div>
    );
  }

  let blogData = {};
  let errorState = {};

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
    const data = blogQuery.data.data.data;

    blogData = {
      id: data.id,
      title: data.attributes.title,
      description: data.attributes.description,
      imageUrl: data.attributes["image_url"],
      subHeading: data.attributes["sub_heading"],
    };
    if (data.attributes.user_id !== userState.id) navigate("/unauthorized");
  }

  return (
    <div className="w-1/3 mx-auto mt-10">
      {blogQuery.isError && <ErrorCard error={errorState} />}

      <Form
        blogData={blogData}
        mutation={blogEditMutation}
        submitButtonText={"Save"}
      />
    </div>
  );
};

export default Edit;

// const deleteButtonHandler = () => {
//   deleteMutation.mutate({ id: data.id });
// };

// const deleteMutation = useMutation({
//   mutationFn: deleteBlog,
//   onSuccess: () => {
//     navigate("/");
//   },
// });
