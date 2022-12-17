const CreditCardPreview = ({ type, number }) => {
  return (
    <div
      className={`p-4 rounded-md w-28 h-[72px] credit-card-preview  ${type} ${type}_text shadow-md`}
    >
      <div className="flex items-center justify-between">
        <div className="h-4 bg-no-repeat bg-contain shadow-sm w-7 chip"></div>
        <div
          className={`h-4 bg-center bg-no-repeat bg-contain w-7 ${type}_issuer shadow-sm`}
        ></div>
      </div>
      <p className="mt-2 text-right select-none">
        **{" "}
        <span className="font-semibold">
          {number.substr(number.length - 4)}
        </span>
      </p>
    </div>
  );
};

export default CreditCardPreview;
