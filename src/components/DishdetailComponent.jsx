import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardImg, CardText, CardTitle } from "reactstrap";
import comments from '../shared/comments.js';
import { Link } from "react-router-dom";

function RenderDish({ dish }) {
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
function RenderComments({ comments }) {
    const dishComments =
      comments.filter(comment => comment.dishId === 0)
      .map(comment => {
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
      <ul className="list-unstyled">{dishComments}</ul>
    </div>
  );
}

function RenderDishWithComments({ dish }) {
  if (dish != null) {
    return (
      <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/menu">Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className="col-12">
            <h3>{dish.name}</h3>
            <hr />
          </div>
        </div>
        <div className="row">
          <RenderDish dish={dish} />
          <RenderComments comments={comments} />
        </div>
      </div>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail = props => {
  return <RenderDishWithComments dish={props.dish} />;
};
export default DishDetail;
