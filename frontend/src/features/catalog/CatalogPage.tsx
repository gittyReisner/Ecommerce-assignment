import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchProducts } from "./catalogSlice";
import { ProductList } from "../../components/ProductList";

export const CatalogPage = () => {
  const dispatch = useAppDispatch();
  const { products, loading } = useAppSelector((state) => state.catalog);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div>
      <h1>Catalog</h1>
      {loading ? <p>Loading...</p> : <ProductList products={products} />}
    </div>
  );
};
