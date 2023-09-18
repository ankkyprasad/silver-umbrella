import { useSelector } from "react-redux";

import ErrorCard from "../shared/ErrorCard";

const FlashCard = () => {
  const flashData = useSelector((state) => state.flash);

  if (!flashData.display) {
    return <></>;
  }

  return (
    <div className="w-1/3 fixed my-8 z-100 left-1/2 -translate-x-1/2">
      <ErrorCard
        error={{
          header: flashData.errorMessage.header,
          message: flashData.errorMessage.message,
        }}
        flashMessageCard={true}
      />
    </div>
  );
};

export default FlashCard;
