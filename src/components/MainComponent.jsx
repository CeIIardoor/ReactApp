import Menu from "./MenuComponent.jsx";
import { Component } from "react";
import Header from "./HeaderComponent.jsx";
import Footer from "./FooterComponent.jsx";
import { Switch, Route, Redirect, withRouter } from "react-router-dom";
import Home from "./HomeComponent.jsx";
import Contact from "./ContactComponent.jsx";
import DishDetail from "./DishdetailComponent.jsx";
import About from "./AboutComponent.jsx";
import { connect } from "react-redux";


const mapStateToProps = state => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders
  };
};

class MainComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const HomePage = () => {
      return (
        <div>
          <Home
            dish={this.props["dishes"].filter(dish => dish.featured)[0]}
            promotion={this.props["promotions"].filter(promo => promo.featured)[0]}
            leader={this.props["leaders"].filter(leader => leader.featured)[0]}
          />
        </div>
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <div>
          <DishDetail
            dish={this.props["dishes"].filter(dish => dish.id === parseInt(match.params.dishId))[0]}
            comments={this.props["comments"].filter(
              comment => comment.dishId === parseInt(match.params.dishId)
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
          <Route exact path="/menu" component={() => <Menu dishes={this.props["dishes"]} />} />
          <Route path={`/menu/:dishId`} component={DishWithId} />
          <Route exact path="/contactus" component={() => <Contact />} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props["leaders"]} />} />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps)(MainComponent));
