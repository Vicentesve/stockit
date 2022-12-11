import { Link } from "react-router-dom";

const AccountCards = ({ img, title, description, url }) => {
  return (
    <Link to={url}>
      <div className="flex space-x-3 w-[320px] px-3 pt-3 pb-24 border border-gray-300 rounded-md hover:bg-gray-200 cursor-pointer">
        <img
          className="w-[70px] h-[70px] object-contain rounded-full"
          src={img}
          alt=""
        />
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm font-medium text-gray-400 ">{description}</p>
        </div>
      </div>
    </Link>
  );
};

export default AccountCards;
