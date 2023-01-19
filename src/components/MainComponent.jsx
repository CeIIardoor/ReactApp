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
import { addComment, fetchDishes } from "../redux/ActionCreators.js";
import { actions } from "react-redux-form";

const mapDispatchToProps = dispatch => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset("feedback"));
  }
});

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

  componentDidMount() {
    this.props["fetchDishes"]();
  }

  render() {
    const HomePage = () => {
      return (
        <div>
          <Home
            dish={this.props["dishes"].dishes.filter(dish => dish.featured)[0]}
            dishesLoading={this.props["dishes"].isLoading}
            dishesErrMess={this.props["dishes"].errMess}
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
            dish={
              this.props["dishes"].dishes.filter(
                dish => dish.id === parseInt(match.params.dishId)
              )[0]
            }
            isLoading={this.props["dishes"].isLoading}
            errMess={this.props["dishes"].errMess}
            comments={this.props["comments"].filter(
              comment => comment.dishId === parseInt(match.params.dishId)
            )}
            addComment={this.props["addComment"]}
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
          <Route exact path="/contactus"
                 component={() => <Contact resetFeedbackForm={this.props["resetFeedbackForm"]} />} />
          <Route exact path="/aboutus" component={() => <About leaders={this.props["leaders"]} />}
          />
          <Redirect to="/home" />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
