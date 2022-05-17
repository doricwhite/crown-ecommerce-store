import { createContext, useState, useEffect } from "react";
import { addCollectionAndDocuments } from "../utils/firebase/firebase.utils.js";
// import SHOP_DATA from "../shop-data.js";

export const ProductsContexts = createContext({
  products: [],
});

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Use effect for firebase db
  // useEffect(() => {
  //   addCollectionAndDocuments("categories", SHOP_DATA);
  // }, []);

  const value = { products };

  return (
    <ProductsContexts.Provider value={value}>
      {children}
    </ProductsContexts.Provider>
  );
};
