import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DISHES from '../shared/dishes.js';
import { Component } from 'react';
import DishDetail from './DishdetailComponent.jsx';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }
  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }
  render() {
    return (
      <div className="MainComponent">
        <Navbar color="primary" dark>
          <div className="container">
            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>
          </div>
        </Navbar>
        <Menu dishes={this.state.dishes} onClick={dishId => this.onDishSelect(dishId)} />
        <DishDetail
          dish={this.state.dishes.filter(dish => dish.id === this.state.selectedDish)[0]}
        />
      </div>
    );
  }
}

export default MainComponent;
