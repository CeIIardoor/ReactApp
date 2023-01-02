import { Card, CardBody, CardImg, CardText, CardTitle } from 'reactstrap';
import comments from '../shared/comments.js';

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
function RenderComments({ dish }) {
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

function RenderDishWithComments({ dish }) {
  if (dish != null) {
    return (
      <div className="row">
        <RenderDish dish={dish} />
        <RenderComments dish={dish} />
      </div>
    );
  } else {
    return <div></div>;
  }
}
const DishDetail = (props) => {
  return <RenderDishWithComments dish={props.dish} />;
}
export default DishDetail;
