import { type Product } from "../api/catalogApi";

type ProductListProps = {
  products: Product[];
  onSelect?: (productId: string) => void;
};

export const ProductList = ({ products, onSelect }: ProductListProps) => {
  return (
    <ul>
      {products.map((p) => (
        <li key={p.id}>
          {p.name} - ${p.price}
          {onSelect && <button onClick={() => onSelect(p.id)}>Select</button>}
        </li>
      ))}
    </ul>
  );
};
