import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { CatalogPage } from "./features/catalog/CatalogPage";
import { OrdersPage } from "./features/orders/OrdersPage";

export const App = () => {
  return (
    <Router>
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
        <Link to="/" style={{ marginRight: "10px" }}>Catalog</Link>
        <Link to="/orders">Orders</Link>
      </nav>

      <Routes>
        <Route path="/" element={<CatalogPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </Router>
  );
};
