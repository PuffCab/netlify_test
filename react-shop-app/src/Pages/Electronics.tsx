import useFetch from "../hooks/useFetch";
import { Container, Row, Spinner } from "react-bootstrap";
import Grid from "../Components/Grid";

function Electronics() {
  const url = "https://fakestoreapi.com/products/category/electronics";
  const { items, loading, error } = useFetch(url);

  if (loading)
    return (
      <div className="d-flex justify-content-center ">
        <Spinner animation="border" />
      </div>
    );
  if (error) console.log(error);
  return (
    <>
      <Container className="mx-auto ms-auto pt-4">
        <Row>
          <Grid items={items} />
        </Row>
      </Container>
    </>
  );
}

export default Electronics;
