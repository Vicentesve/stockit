import React from "react";

const CreditCardSkeleton = () => {
  return (
    <div className="rccs animate-pulse">
      <div className="rccs__card rccs__card--mastercard">
        <div className="rccs__card--front">
          <div className="rccs__card__background"></div>
          <div className="rccs__issuer"></div>
          <div className="rccs__number rccs--filled">•••• •••• •••• ••••</div>
          <div className="h-2 bg-gray-200 rounded-full rccs__name rccs--filled"></div>
          <div className="rccs__expiry rccs--filled">
            <div className=" rccs__expiry__valid">valid thru</div>
            <div className="h-2 bg-gray-300 rounded-full rccs__expiry__value"></div>
          </div>
          <div className="rccs__chip"></div>
        </div>
      </div>
    </div>
  );
};

export default CreditCardSkeleton;
