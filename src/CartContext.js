import { createContext, useState } from "react";
import { getProductData } from "./productsStore";
import { productsArray } from "./productsStore";

export const CartContext = createContext({
  items: [],
  getproductQuantity: () => {},
  addOneToCart: () => {},
  removeOneToCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

export function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  const contextValues = {
    items: cartProducts,
    getproductQuantity,
    addOneToCart,
    removeOneToCart,
    deleteFromCart,
    getTotalCost,
  };

  function getproductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) return 0;

    return quantity;
  }

  function addOneToCart(id) {
    let quantity = getproductQuantity(id);

    if (quantity === 0) {
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? {
                ...product,
                quantity: product.quantity + 1,
              }
            : product
        )
      );
    }
  }

  function removeOneToCart(id) {
    const quantity = getproductQuantity(id);

    if (quantity === 0) return;
    else if (quantity === 1) deleteFromCart(id);
    else
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      );
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter(
        (currProcduct) => currProcduct.id !== id
      )
    );
  }

  function getTotalCost() {
    let totalCost = 0;

    cartProducts.map((cartItem) => {
      const { price } = getProductData(cartItem.id);
      totalCost += price * cartItem.quantity;
    });

    return totalCost;
  }

  return (
    <CartContext.Provider value={contextValues}>
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
