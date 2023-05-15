import React from 'react';
import classes from './Input.module.css';

const Input = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      {/* ...props.input ensure all the key value pairs in this input object, which we receive on props input are added as props to input */}
      <input ref={ref} {...props.input}/>
    </div>
  );
});

export default Input;
