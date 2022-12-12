import React from "react";
import AccountCards from "../../components/Store/AccountCards";

const MyAccount = () => {
  const accountCards = [
    {
      title: "My Orders",
      description: "Track packages, return orders or buy something again",
      img: "https://m.media-amazon.com/images/G/33/x-locale/cs/help/images/gateway/self-service/order._CB661171412_.png",
    },
    {
      title: "My Payments",
      description: "View my transactions and manage payment methods",
      img: "https://m.media-amazon.com/images/G/33/x-locale/cs/help/images/gateway/self-service/payment._CB661171412_.png",
    },
    {
      title: "My Addresses",
      description: "Edit addresses for orders and gifts",
      img: "https://m.media-amazon.com/images/G/33/x-locale/cs/contact-us/YAaddress._CB660350531_.png",
      url: "/my-account/my-addresses",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="w-full max-w-screen-xl p-2 mx-auto bg-white ">
        <div className="grid grid-cols-1 gap-5 mx-auto sm:grid-cols-2 md:grid-cols-3 place-items-stretch w-fit">
          <h3 className="text-3xl font-semibold sm:col-span-2 lg:col-span-3">
            My Account
          </h3>
          {accountCards?.map((card, i) => (
            <AccountCards
              title={card?.title}
              description={card?.description}
              img={card?.img}
              url={card?.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
