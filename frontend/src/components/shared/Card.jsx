const Card = (props) => {
  return (
    <div className="border border-gray-300 bg-gray-50 shadow-md rounded">
      {props.children}
    </div>
  );
};

export default Card;
