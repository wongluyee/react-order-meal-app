import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";
import CartContext from "../../store/cart-context";
import classes from "./HeaderCart.module.css";

const HeaderCart = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);

  const cartCtx = useContext(CartContext);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  // Not the whole context but only items array is the dependency in our useEffect
  const { items } = cartCtx

  useEffect(()=>{
    if (items.length === 0) {
      return;
    }
    setBtnIsHighlighted(true);

    // Set a timer to remove the bump class
    const timer = setTimeout(() => {
      setBtnIsHighlighted(false);
    }, 300)

    // cleanup function
    return () => {
      clearTimeout(timer)
    }
  }, [items]);

  const numberOfCartItems = cartCtx.items.reduce((currentNumber, item) => {
    return currentNumber + item.amount;
  }, 0);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default HeaderCart;
