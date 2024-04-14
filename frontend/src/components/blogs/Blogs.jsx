import { useInfiniteQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/api/blogs";
import Card from "./Card";
import LoadingSvg from "../shared/LoadingSvg";
import { useEffect, useRef } from "react";

const Blogs = () => {
  const blogsQuery = useInfiniteQuery({
    queryKey: ["blogs"],
    queryFn: ({ pageParam = 1 }) => {
      return getBlogs({
        pageNumber: pageParam,
      });
    },
    config: {
      keepPreviousData: true,
    },
    getNextPageParam: (lastPage, _) => {
      const nextPageUrl = lastPage.data.links.next;
      if (nextPageUrl === undefined) return undefined;

      const params = {};
      nextPageUrl
        .split("?")[1]
        .split("&")
        .forEach((el) => {
          const data = el.split("=");
          params[data[0]] = data[1];
        });

      return params["page%5Bnumber%5D"];
    },
    refetchOnWindowFocus: false,
  });

  const loaderRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && blogsQuery.hasNextPage !== false) {
        blogsQuery.fetchNextPage();
      }
    }, options);

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) observer.unobserve(currentLoaderRef);
    };
  }, [loaderRef, blogsQuery]);

  let blogsComponents = [];

  if (blogsQuery.isLoading === false) {
    const blogsData = blogsQuery.data.pages
      .map((page) => page.data.data)
      .flat();

    blogsComponents = blogsData.map((blog, index) => {
      const newBlog = {
        id: blog.id,
        title: blog.attributes.title,
        description: blog.attributes.description,
        authorName: blog.attributes.author_name,
        imageUrl: blog.attributes.image_url,
        publishedDate: blog.attributes.published_date,
      };

      return (
        <Card
          key={newBlog.id}
          blog={newBlog}
          query={blogsQuery}
          dataSize={blogsData.length}
          index={index}
        />
      );
    });
  }

  return (
    <div className="grid grid-cols-1 gap-6">
      {blogsQuery.isLoading ? (
        <LoadingSvg className={"flex justify-center"} />
      ) : (
        blogsComponents
      )}

      <div
        className="flex justify-center"
        style={{ height: blogsQuery.hasNextPage ? "30px" : "inherit" }}
        ref={loaderRef}
      >
        {blogsQuery.isFetchingNextPage && <LoadingSvg />}
      </div>
    </div>
  );
};

export default Blogs;
