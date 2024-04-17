import { useInfiniteQuery } from "@tanstack/react-query";
import { getBlogs } from "../../services/api/blogs";
import Card from "./Card";
import LoadingSvg from "../shared/LoadingSvg";
import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { revokeTokenThunk } from "../../store/userSlice";
import ErrorCard from "../shared/ErrorCard";

const Blogs = (props) => {
  const dispatch = useDispatch();

  const blogsQuery = useInfiniteQuery({
    queryKey: props.userId ? ["blogs", props.userId] : ["blogs"],
    queryFn: ({ pageParam = 1 }) => {
      return getBlogs({
        pageNumber: pageParam,
        userId: props.userId,
      });
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
    retry: false,
  });

  const loaderRef = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries) => {
      if (
        entries[0].isIntersecting &&
        blogsQuery.hasNextPage !== false &&
        blogsQuery.isError === false
      ) {
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
  let errorData = {};

  if (blogsQuery.isError) {
    if (blogsQuery.error.status === 401) {
      dispatch(revokeTokenThunk());
    } else if (blogsQuery.error.status >= 500) {
      errorData = {
        header: "Internal Server Error",
        message: "Please Hang tight, it will be fixed soon!",
      };
    }
  }

  if (blogsQuery.isLoading === false && blogsQuery.isError === false) {
    const blogsData = blogsQuery.data.pages
      .map((page) => page.data.data)
      .flat();

    blogsComponents = blogsData.map((blog, index) => {
      const newBlog = {
        id: blog.id,
        title: blog.attributes.title,
        subHeading: blog.attributes["sub_heading"],
        authorName: blog.attributes.author_name,
        imageUrl: blog.attributes.image_url,
        publishedDate: blog.attributes.published_date,
      };

      return (
        <Card key={newBlog.id} blog={newBlog} profileUserId={props.userId} />
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

      {blogsQuery.isError && <ErrorCard error={errorData} />}

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
