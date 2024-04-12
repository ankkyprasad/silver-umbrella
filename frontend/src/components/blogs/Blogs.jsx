import { useQuery } from "@tanstack/react-query";
import Loading from "../shared/LoadingSvg";
import { getBlogs } from "../../services/api/blogs";
import { useState } from "react";
import Card from "./Card";

const Blogs = () => {
  const [pageNumber, setPageNumber] = useState(1);

  const blogsQuery = useQuery({
    queryKey: ["blogs", pageNumber],
    queryFn: () =>
      getBlogs({
        pageNumber,
      }),
  });

  if (blogsQuery.isLoading) {
    return (
      <div className="flex justify-center">
        <Loading />
      </div>
    );
  }

  const blogsData = blogsQuery.data.data.data;

  const blogsComponents = blogsData.map((blog) => {
    const newBlog = {
      id: blog.id,
      title: blog.attributes.title,
      description: blog.attributes.description,
      authorName: blog.attributes.author_name,
      imageUrl: blog.attributes.image_url,
      publishedDate: blog.attributes.published_date,
    };

    return <Card key={newBlog.id} blog={newBlog} />;
  });

  return <div className="grid grid-cols-1 gap-6">{blogsComponents}</div>;
};

export default Blogs;
