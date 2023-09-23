import { Link } from "react-router-dom";

const Card = ({ blog }) => {
  return (
    <div className="w-full lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{ backgroundImage: `url("${blog.imageUrl}")` }}
      ></div>
      <div className="border-r border-b border-l border-gray-800 lg:border-l-0 lg:border-t rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal bg-gray-900 hover:bg-gray-800 hover:scale-105 transition-all w-full">
        <div className="mb-8">
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #photography
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #travel
          </span>
          <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
            #winter
          </span>

          <Link className="cursor-pointer" to={`/blogs/${blog.id}`}>
            <div className="text-gray-200 font-bold text-xl mb-2">
              {blog.title}
            </div>
            <p className="text-gray-400 text-base h-24 overflow-hidden text-ellipsis">
              {blog.description}
            </p>
          </Link>
        </div>
        <div className="flex items-center">
          <img
            className="w-10 h-10 rounded-full mr-4"
            src="https://cdn-icons-png.flaticon.com/512/6596/6596121.png"
            alt="Avatar of Jonathan Reinink"
          />
          <div className="text-sm">
            <p className="text-gray-100 leading-none">{blog.authorName}</p>
            <p className="text-gray-300">{blog.publishedDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
