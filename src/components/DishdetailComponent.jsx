import { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import comments from '../shared/comments.js';

class DishDetail extends Component {
  constructor(props) {
    super(props);
  }

  renderDish(dish) {
    return (
      <div className="col-12 col-md-5 m-1">
        <Card>
          <CardImg width="100%" src={dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </div>
    );
  }
  renderComments(dish) {
    const dishComments = comments.filter(comment => comment.dishId === dish.id);
    const commentsList = dishComments.map(comment => {
      return (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <p>
            -- {comment.author},
            {new Intl.DateTimeFormat('fr-FR', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            }).format(new Date(Date.parse(comment.date)))}
          </p>
        </li>
      );
    });
    return (
      <div className="col-12 col-md-5 m-1">
        <h4>Comments</h4>
        <ul className="list-unstyled">{commentsList}</ul>
      </div>
    );
  }

  renderDishWithComments(dish) {
    if (dish != null) {
      return (
        <div className="row">
          {this.renderDish(dish)}
          {this.renderComments(dish)}
        </div>
      );
    } else {
      return <div></div>;
    }
  }
  render() {
    return <div>{this.renderDishWithComments(this.props.dish)}</div>;
  }
}
export default DishDetail;
