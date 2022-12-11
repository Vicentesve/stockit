import {
  ArrowRightIcon,
  CheckBadgeIcon,
  ShoppingCartIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../redux/api";
import { addToCart } from "../../redux/storeSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(location?.state?.product);

  const [rating] = useState(Math.floor(Math.random() * (5 - 1 + 1)) + 1);
  const randomIntFromInterval = (min, max) => {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  const currencyFormat = (num) => {
    if (!isNaN(num)) {
      return "$" + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
    } else {
      return num;
    }
  };
  useEffect(() => {
    const getProduct = async () => {
      const product = await getProductById(params?.id);
      setProduct(product.data);
    };

    if (!product) {
      getProduct();
    }
  }, [product, params?.id]);

  const pushToCart = (type) => {
    const productToAdd = { ...product };
    productToAdd.fromWarehouseId = location?.state
      ? location?.state?.warehouseId
      : product?.warehouseId;
    dispatch(addToCart(productToAdd));

    if (type === 2) {
      navigate(`/checkout`);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-screen-2xl">
        <img
          className="h-[150px] object-cover w-full"
          src="https://links.papareact.com/dyz"
          alt=""
        />
        <div className="p-2 sm:flex sm:space-x-2">
          {/* Image */}
          <div className="sm:h-[500px] sm:w-[500px] h-[300px]">
            <img
              src={product?.image}
              className="object-contain w-full h-full"
              alt=""
            />
          </div>

          {/* Info */}
          <div className="w-full p-5 ">
            <h2 className="text-2xl font-semibold text-center sm:text-left">
              {product?.name}
            </h2>
            <div className="flex justify-center mt-1 sm:justify-start">
              {Array(rating)
                .fill()
                .map((_, i) => (
                  <StarIcon
                    key={`${i}_${product?._id}`}
                    className="h-5 text-yellow-400"
                  />
                ))}

              <p className="ml-2 text-sm text-blue-500 cursor-pointer hover:underline ">
                {randomIntFromInterval(30000, 100000)}
              </p>
            </div>
            <h5 className="bg-blue-100 text-blue-800 text-sm font-medium w-fit mx-auto sm:mx-0 px-2.5 py-0.5 rounded mt-2 text-center sm:text-left">
              Stockit Option
            </h5>

            <hr className="w-full mt-5" />
            <p className="mt-5 text-4xl">
              <strong>
                {currencyFormat(parseFloat(product?.price?.$numberDecimal))}
              </strong>
            </p>

            <div className="flex items-center p-1 mt-2 text-blue-600 bg-yellow-200 rounded-md shadow-sm w-fit">
              <CheckBadgeIcon className="h-5 " />
              <p className="">Stock prime</p>
            </div>

            <p className="mt-2 text-sm text-gray-500">{product?.description}</p>

            <div className="flex space-x-5">
              <button
                onClick={() => pushToCart(1)}
                className="flex w-[140px] justify-center items-center px-4 py-2 mt-5 space-x-1 text-sm font-medium text-white bg-yellow-400 rounded-lg focus:outline-none hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300"
              >
                <ShoppingCartIcon className="h-5" />
                <span>Add to cart</span>
              </button>

              <button
                onClick={() => pushToCart(2)}
                className="flex w-[140px] justify-center items-center px-4 py-2 mt-5 space-x-1 text-sm font-medium text-white bg-orange-400 rounded-lg focus:outline-none hover:bg-orange-500 focus:ring-4 focus:ring-yellow-300"
              >
                <ArrowRightIcon className="h-5" />
                <span>Buy now</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
