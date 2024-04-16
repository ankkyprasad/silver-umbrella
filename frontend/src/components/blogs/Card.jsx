import { Link } from "react-router-dom";
import UserAvatar from "../users/UserAvatar";

const Card = ({ blog }) => {
  console.log(blog.subHeading);

  return (
    <Link className="cursor-pointer" to={`/blogs/${blog.id}`}>
      <div className="w-full bg-gradient-to-tr bg-stone-100 border border-zinc-300 px-8 py-4 flex rounded-3xl shadow-md hover:border-zinc-500">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="text-zinc-700 text-sm">
              <UserAvatar />
              {blog.authorName}
            </div>

            <div
              className={`text-slate-800 text-lg mt-2 mb-1 font-bold mr-8 ${
                blog.subHeading !== null ? "line-clamp-1" : "line-clamp-2"
              }`}
            >
              {blog.title}
            </div>

            <div className="text-gray-700 text-md line-clamp-2 font-extralight mr-8">
              {blog.subHeading}
            </div>
          </div>
          <div className="text-sm text-zinc-600">{blog.publishedDate}</div>
        </div>

        <div>
          <img
            src={blog.imageUrl}
            alt=""
            style={{ height: "150px", width: "150px" }}
            className="fit-cover rounded-md"
          />
        </div>
      </div>
    </Link>
  );
};

export default Card;
