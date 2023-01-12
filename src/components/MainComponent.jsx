import Menu from './MenuComponent';
import { Component } from 'react';
import Header from './HeaderComponent.jsx';
import Footer from './FooterComponent.jsx';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import DishDetail from './DishdetailComponent.jsx';
import About from './AboutComponent.jsx';

class MainComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <div>
          <Home
            dish={this.state.dishes.filter(dish => dish.featured)[0]}
            promotion={this.state.promotions.filter(promo => promo.featured)[0]}
            leader={this.state.leaders.filter(leader => leader.featured)[0]}
          />
        </div>
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <div>
          <DishDetail
            dish={this.state.dishes.filter(dish => dish.id === parseInt(match.params.dishId))[0]}
            comments={this.state.comments.filter(
              comment => comment.dishId === parseInt(match.params.dishId),
            )}
          />
        </div>
      );
    };

    return (
      <div>
        <Header />
        <Switch>
          <Route path="/home" component={HomePage} />
          <Route exact path="/menu" component={() => <Menu dishes={this.state.dishes} />} />
          <Route path={`/menu/:dishId`} component={DishWithId} />
          <Route exact path="/contactus" component={Contact} />
          <Route exact path="/aboutus" component={() => <About leaders={this.state.leaders} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default MainComponent;
