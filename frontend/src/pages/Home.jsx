import Blogs from "../components/blogs/Blogs";
import CategoryCard from "../components/shared/CategoryCard";

const Home = () => {
  return (
    <div className="w-3/4 mx-auto my-8">
      <div className="flex">
        <div className="flex-1 mx-8">
          <Blogs />
        </div>
        <div className="flex-1 mx-8">
          <div className="fixed">
            <h3 className="text-2xl font-semibold text-zinc-700 mb-8">
              Discover more topics
            </h3>
            <div className="grid grid-cols-3 gap-3">
              {[
                "Programming",
                "Technology",
                "Science",
                "Health",
                "Self Improvement",
              ].map((item) => (
                <CategoryCard title={item} />
              ))}
            </div>

            <div className="text-green-600 text-sm mt-6 mb-10 cursor-pointer">
              See more topics
            </div>

            <hr className="h-px my-8 bg-gray-400/25 border-0" />

            <div className="text-sm text-gray-500 mt-5">
              <p className="inline pr-5">Help</p>
              <p className="inline pr-5">Terms</p>
              <p className="inline">Privacy</p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="text-center my-8">
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
      </div> */}
    </div>
  );
};

export default Home;
