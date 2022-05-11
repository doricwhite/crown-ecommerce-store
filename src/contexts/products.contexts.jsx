import { createContext, useState } from "react";

import PRODUCTS from "../shop-data.json";

export const ProductsContexts = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const value = { products };

  return (
    <ProductsContexts.Provider value={value}>
      {children}
    </ProductsContexts.Provider>
  );
};
