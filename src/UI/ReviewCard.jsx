import "bootstrap/dist/css/bootstrap.min.css";
import Card from "react-bootstrap/Card";

function ReviewCard(props) {
  return (
    <Card className="text-center">
      <Card.Header>{props.course}</Card.Header>
      <Card.Body>
        <Card.Title>
          Workload: {props.data.workload} Rating: {props.data.rating}
        </Card.Title>
        <Card.Text>
          {props.data.comment}
        </Card.Text>
      </Card.Body>
      <Card.Footer className="text-muted">2 days ago</Card.Footer>
    </Card>
  );
}
export default ReviewCard;
