import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import CardProduct from "../../components/Store/CardProduct";
import { getProductsByCategory } from "../../redux/storeSlice";

const CategoryPage = () => {
  const params = useParams();
  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.store);
  const { categories } = useSelector((state) => state.categories);

  const objIndex = categories.findIndex((obj) => obj._id === params?.id);

  useEffect(() => {
    dispatch(getProductsByCategory(params?.id));
  }, [dispatch, params]);
  return (
    <div className="p-2 mx-auto max-w-screen-2xl">
      <h3 className="text-3xl font-bold">{categories[objIndex]?.name}</h3>

      <div className="w-full p-3 mt-5 border border-gray-300 rounded-lg">
        Over {products?.length} products for{" "}
        <span className="font-semibold text-orange-500">
          {categories[objIndex]?.name}
        </span>
      </div>

      <div className="grid w-full gap-3 mt-5 grid-col-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 place-items-center">
        {products?.map((product, i) => (
          <CardProduct
            key={`${product?._id}_${i}`}
            product={product?.products}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
