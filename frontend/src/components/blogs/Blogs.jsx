import Card from "./Card";

const Blogs = ({blogsData}) => {
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

  return <div className="grid grid-cols-2 gap-6">{blogsComponents}</div>;
};

export default Blogs;
