import { Fragment } from 'react';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import HeaderCart from './HeaderCart';

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>ReactMeals</h1>
        <HeaderCart />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="meals header" />
      </div>
    </Fragment>
  );
};

export default Header;
