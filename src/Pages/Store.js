import { Row, Col } from "react-bootstrap";
import { productsArray } from "../productsStore";

function Store() {
  return (
    <>
      <h1 align="center" className="p-3">
        Welcome to the Store!
      </h1>
      <Row xs={1} md={3} className="g-4">
        {productsArray.map(({ title, price }, idx) => (
          <Col align="center" key={idx}>
            <h1>{title}</h1>
            <h5>{price}</h5>
          </Col>
        ))}
      </Row>
    </>
  );
}

export default Store;
