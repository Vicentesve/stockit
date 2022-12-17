import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMyPayments, resetPayments } from "../../redux/storeSlice";
import Cards from "react-credit-cards-2";
import CreditCardSkeleton from "../../components/Store/CreditCardSkeleton";

const MyPayments = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const myPayments = useSelector((state) => state.store.myPayments);
  const isLoading = useSelector((state) => state.store.isLoading);

  useEffect(() => {
    dispatch(getMyPayments(user?._id));

    return () => {
      dispatch(resetPayments());
    };
  }, [dispatch, user?._id]);
  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-screen-xl p-2 mx-auto ">
        <div className="grid grid-cols-1 gap-5 mx-auto w-fit sm:grid-cols-2 lg:grid-cols-3 place-content-around">
          <h3 className="text-3xl font-semibold sm:col-span-2 lg:col-span-3">
            My Payments
          </h3>

          <Link to="/my-account/my-payments/new-payment">
            <div className="cursor-pointer flex justify-center items-center flex-col w-[290px] h-[180px] border-2 border-gray-300 rounded-md border-dashed text-gray-400">
              <svg
                className="w-24 h-24"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <h3 className="text-2xl font-semibold">Add Method Payment</h3>
            </div>
          </Link>

          {isLoading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <CreditCardSkeleton key={i} />
              ))}
            </>
          ) : (
            <>
              {myPayments?.map((payment, i) => (
                <Link
                  to="/my-account/my-payments/new-payment"
                  state={{ payment, isEdit: true }}
                  className="relative cursor-pointer group"
                >
                  <Cards
                    key={i}
                    cvc={payment.cvc}
                    expiry={payment.expiry}
                    name={payment.name}
                    preview={true}
                    number={payment.number}
                    issuer={payment.issuer}
                  />

                  {payment.isDefault ? (
                    <div className="absolute h-[100px] w-[120px]  p-1 text-xs text-right clip-your-needful-style bg-lime-500 top-2 shadow-md right-0">
                      <span className="font-semibold tracking-wider">
                        Default Card
                      </span>
                    </div>
                  ) : null}
                  <div className="absolute top-0 hidden text-white rccs group-hover:block ">
                    <div className="rccs__card ">
                      <div className="h-full rounded-[14.5px] bg-black_rgba_card flex justify-center items-center">
                        <h4 className="text-xl font-semibold tracking-wider shadow-sm">
                          Edit card
                        </h4>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPayments;
