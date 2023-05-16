import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0
};

// Outside of the component because it doesn't need anything from that component and it shouldn't be recreated all the time when the component is reevaluated.
const cartReducer = (state, action) => {
  // the latest state snapshot
  if (action.type === 'ADD') {
    const existCartItemIndex = state.items.findIndex((item) =>
      item.id === action.item.id
    );

    const existCartItem = state.items[existCartItemIndex];
    let updatedItem;
    let updatedItems;

    if (existCartItem) {
      updatedItem = {
        ...existCartItem,
        amount: existCartItem.amount + action.item.amount
      };
      updatedItems = [...state.items];
      updatedItems[existCartItemIndex] = updatedItem;
    } else {
      // concat function return a new array
      updatedItems = state.items.concat(action.item);
    }
    const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount
    };
  }
  return defaultCartState;
};

// To manage the cart context data and provide that context to all components that want access to it.
const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

  const addItemToCartHandler = (item) => {
    // setup type so that it can be trigger by the cartReducer
    dispatchCartAction({type: 'ADD', item: item})
  };
  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({type: 'REMOVE', id: id})
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    // Wrap any components to get access to this context with this cart provider component.
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
