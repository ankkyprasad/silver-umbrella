import { useQuery } from "@tanstack/react-query";

import Card from "./Card";
import Loading from "../shared/LoadingSvg";

import { getBlogs } from "../../services/api/blogs";

const Blogs = () => {
  const blogsQuery = useQuery({
    queryKey: ["blogs"],
    queryFn: getBlogs,
  });

  if (blogsQuery.isLoading) {
    return (
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />;
      </div>
    );
  }

  const blogsData = blogsQuery.data.data.data;

  const blogsComponents = blogsData.map((blog) => {
    const newBlog = {
      id: blog.id,
      title: blog.attributes.title,
      description: blog.attributes.description,
      authorName: blog.attributes["author-name"],
      imageUrl: blog.attributes["image-url"],
      publishedDate: blog.attributes["published-date"],
    };

    return <Card key={newBlog.id} blog={newBlog} />;
  });

  return <div className="grid grid-cols-2 gap-6">{blogsComponents}</div>;
};

export default Blogs;
