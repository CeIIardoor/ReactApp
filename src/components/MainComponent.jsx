import Menu from './MenuComponent';
import DISHES from '../shared/dishes.js';
import { Component } from 'react';
// import DishDetail from './DishdetailComponent.jsx';
import Header from './HeaderComponent.jsx';
import Footer from './FooterComponent.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';

class MainComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  render() {
    const HomePage = () => {
      return (
        <div>
          <Home />
        </div>
      );
    }
    return (
      <div>
        <Header/>
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
            <Redirect to="/home" />
          </Switch>
        <Footer/>
      </div>
    );
  }
}

export default MainComponent;
