import React from "react";

function StatusOrder({ status }) {
  const allStatus = [
    "Order placed",
    "Order confirmed",
    "Order processed",
    "Order completed",
  ];

  const StatusCheck = ({ isCheck, label, isLast }) => {
    return (
      <div className="flex flex-col items-center space-y-1 sm:space-y-0 sm:space-x-5 sm:flex-row">
        <div className="relative">
          {isCheck ? (
            <svg
              className="w-5 h-5 text-white bg-green-600 rounded-full p-[2px] shadow-sm"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          ) : (
            <div className="w-5 h-5 border border-gray-300 rounded-full shadow-sm"></div>
          )}

          <p
            className={`absolute whitespace-nowrap sm:left-[50%] sm:translate-x-[-50%] ml-1 sm:ml-0 left-[100%] top-0 sm:top-auto ${
              isCheck && "text-green-600"
            }`}
          >
            {label}
          </p>
        </div>
        {!isLast && (
          <div
            className={`w-1 h-6 sm:w-24 sm:h-1 rounded-full ${
              isCheck ? "bg-green-600" : "bg-gray-300"
            }`}
          ></div>
        )}
      </div>
    );
  };

  return (
    <div className="flex mt-2 mb-10 sm:px-10 sm:justify-center">
      <div className="flex flex-col space-y-1 text-xs sm:flex-row sm:space-y-0 sm:space-x-5">
        {allStatus?.map((item, i) => (
          <StatusCheck
            key={i}
            isCheck={status >= i ? true : false}
            label={item}
            isLast={allStatus.length - 1 === i ? true : false}
          />
        ))}
      </div>
    </div>
  );
}

export default StatusOrder;
