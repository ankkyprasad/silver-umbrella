import { useQuery } from "@tanstack/react-query";

import Blogs from "../components/blogs/Blogs";
import Loading from "../components/shared/LoadingSvg";

import { getBlogs } from "../services/api/blogs";
import { useState } from "react";

const Home = () => {
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loading />;
      </div>
    );
  }

  const links = blogsQuery.data.data.links;

  return (
    <div className="text-white w-3/4 mx-auto my-8">
      <Blogs blogsData={blogsQuery.data.data.data} />
      <div className="text-center my-8">
        {links.prev && (
          <button
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none mx-4"
            onClick={() => setPageNumber((prev) => prev - 1)}
          >
            Prev
          </button>
        )}

        {links.next && (
          <button
            className="inline-flex items-center justify-center px-4 py-2 text-base font-medium leading-6 text-white whitespace-no-wrap bg-blue-600 border border-blue-700 rounded-md shadow-sm hover:bg-blue-700 focus:outline-none mx-4"
            onClick={() => setPageNumber((prev) => prev + 1)}
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
