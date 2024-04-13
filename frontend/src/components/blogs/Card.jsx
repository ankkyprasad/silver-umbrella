import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

const Card = ({ blog }) => {
  return (
    <Link className="cursor-pointer" to={`/blogs/${blog.id}`}>
      <div className="w-full bg-gradient-to-tr bg-stone-100 border border-zinc-300 px-8 py-4 flex rounded-3xl shadow-md hover:border-zinc-500">
        <div className="flex-1 flex flex-col justify-between">
          <div>
            <div className="text-zinc-700 text-sm">
              <img
                src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?size=338&ext=jpg&ga=GA1.1.1700460183.1712793600&semt=ais"
                alt="Avatar"
                style={{ height: "20px", width: "20px" }}
                className="inline rounded-xl mr-2"
              />
              {blog.authorName}
            </div>

            <div className="text-slate-800 text-lg mt-2 mb-1 line-clamp-1 font-bold mr-8">
              {blog.title}
            </div>

            <div className="text-gray-700 text-md line-clamp-2 font-extralight mr-8">
              <ReactMarkdown>{blog.description}</ReactMarkdown>
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
