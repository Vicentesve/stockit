import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/Store/CardProduct";
import LoadingCard from "../../components/Store/LoadingCard";
import { getProductsByWarehouse } from "../../redux/storeSlice";

const WarehousePage = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { warehouses, isLoading } = useSelector((state) => state.store);
  const { products } = useSelector((state) => state.store);
  const { categories } = useSelector((state) => state.categories);

  const objIndexWarehouse = warehouses.findIndex(
    (obj) => obj._id === params?.id
  );

  const findIndexCategory = (id) => {
    return categories.findIndex((obj) => obj._id === id);
  };

  useEffect(() => {
    dispatch(getProductsByWarehouse(params?.id));
  }, [dispatch, params]);

  return (
    <div className="p-2 mx-auto max-w-screen-2xl">
      <h3 className="text-3xl font-bold">
        {warehouses[objIndexWarehouse]?.name}
      </h3>

      <div className="w-full p-3 mt-5 border border-gray-300 rounded-lg">
        Over {products?.length} products for{" "}
        <span className="font-semibold text-orange-500">
          {warehouses[objIndexWarehouse]?.name}
        </span>
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
                category={
                  categories[findIndexCategory(product?.category)]?.name
                }
                warehouseId={params?.id}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default WarehousePage;
