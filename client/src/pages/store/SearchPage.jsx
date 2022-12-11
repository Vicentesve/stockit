import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductsBySearch, resetProducts } from "../../redux/storeSlice";
import LoadingCard from "../../components/Store/LoadingCard";
import CardProduct from "../../components/Store/CardProduct";
import {
  resetAll,
  setCategoryId,
  setSearch,
} from "../../redux/inputSearchSlice";

const SearchPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const products = useSelector((state) => state.store.products);
  const isLoading = useSelector((state) => state.store.isLoading);

  useEffect(() => {
    dispatch(setCategoryId(params?.categoryId));
    dispatch(setSearch(params?.search));
    dispatch(
      getProductsBySearch({
        categoryId: params?.categoryId,
        search: params?.search,
      })
    );

    return () => {
      dispatch(resetProducts());
      dispatch(resetAll());
    };
  }, [dispatch, params]);
  return (
    <div className="p-2 mx-auto max-w-screen-2xl">
      <h3 className="text-3xl font-bold">Results</h3>

      <div className="w-full p-3 mt-5 border border-gray-300 rounded-lg">
        Over {products?.length} products for search:{" "}
        <span className="font-semibold text-orange-500">{params?.search}</span>
      </div>

      <div className="grid w-full gap-3 mt-5 grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center">
        {isLoading ? (
          <>
            {[...Array(10)].map((_, i) => (
              <LoadingCard key={i} />
            ))}
          </>
        ) : (
          <>
            {products?.map((product, i) => (
              <CardProduct
                key={`${product?._id}_${i}`}
                product={product}
                warehouseId={product?.adminId}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
