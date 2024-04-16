import { useMutation } from "@tanstack/react-query";
import Form from "../../components/blogs/Form";
import { createBlog } from "../../services/api/blogs";
import { revokeTokenThunk } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ErrorCard from "../../components/shared/ErrorCard";

const Create = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errorData, setErrorData] = useState({});

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

  return (
    <div className="w-1/3 mx-auto mt-10">
      {createBlogMutation.isError && <ErrorCard error={errorData} />}

      <Form mutation={createBlogMutation} submitButtonText="Publish" />
    </div>
  );
};

export default Create;
