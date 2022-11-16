import React from "react";

const CardFeed = ({ titleCard, imageCard }) => {
  return (
    <div className="h-[420px] w-[350px] border border-gray-300 rounded-sm shadow-lg bg-white z-30 p-5">
      <h2 className="text-2xl font-bold">{titleCard}</h2>

      <img
        className="object-cover h-[80%] mt-2 w-full"
        src={imageCard}
        alt=""
      />

      <p className="mt-3 text-sm text-blue-400 cursor-pointer hover:underline">
        See more
      </p>
    </div>
  );
};

export default CardFeed;
