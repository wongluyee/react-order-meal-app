import React from 'react';
import classes from './Card.module.css';

const Card = (props) => {
  // props.children = whatever is passed between the opening and closing tag of the Card component is used inside the Card.
  return (
    <div className={classes.card}>
      {props.children}
    </div>
  );
};

export default Card;
