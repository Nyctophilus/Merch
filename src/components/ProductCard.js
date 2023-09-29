import {
  Card,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { CartContext } from "../CartContext";
import { useContext } from "react";
import { getProductData } from "../productsStore";

function ProductCard({ title, price, id }) {
  const {
    getproductQuantity,
    addOneToCart,
    items,
    removeOneToCart,
    deleteFromCart,
  } = useContext(CartContext);

  const handleAddOne = () => addOneToCart(id);
  const handleRemoveOne = () => removeOneToCart(id);
  const handleDeletion = () => deleteFromCart(id);

  console.log(items);
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          {title || getProductData(id).title}
        </Card.Title>
        <Card.Text>
          ${price || getProductData(id).price}
        </Card.Text>
        {getproductQuantity(id) > 0 ? (
          <>
            <Form as={Row}>
              <Form.Label column="true" sm="6">
                In Cart: {getproductQuantity(id)}
              </Form.Label>
              <Col sm="6">
                <Button
                  sm="6"
                  className="mx-2"
                  onClick={handleAddOne}
                >
                  +
                </Button>
                <Button
                  sm="6"
                  className="mx-2"
                  onClick={handleRemoveOne}
                >
                  -
                </Button>
              </Col>
            </Form>
            <Button
              variant="danger"
              className="my-2"
              onClick={handleDeletion}
            >
              Remove From Cart
            </Button>
          </>
        ) : (
          <Button variant="primary" onClick={handleAddOne}>
            Add To Cart
          </Button>
        )}
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
