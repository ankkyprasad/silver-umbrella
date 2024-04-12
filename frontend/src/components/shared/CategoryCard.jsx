const CategoryCard = ({ title }) => {
  return (
    <div className="bg-gray-300 text-zinc-700 text-sm py-2 px-3 rounded-2xl cursor-pointer">
      <p className="w-36 flex items-center justify-center">{title}</p>
    </div>
  );
};

export default CategoryCard;
