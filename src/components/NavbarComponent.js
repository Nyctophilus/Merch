import { useState, useContext } from "react";
import {
  Button,
  Container,
  Navbar,
  Modal,
} from "react-bootstrap";
import { CartContext } from "../CartContext";
import ProductCard from "./ProductCard";
import { getProductData } from "../productsStore";

function NavbarComponent() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { items, getTotalCost } = useContext(CartContext);
  const productsCount = items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const checkout = async () => {
    await fetch("http://localhost:4000/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ items: items }),
    }).then((res) => {
      if (res.url) window.location.assign(res.url); //forwarding user to stripe
    });
  };

  return (
    <>
      <Navbar expand="sm">
        <Navbar.Brand href="/">
          Ecommerce Store
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button onClick={handleShow}>
            Cart ({productsCount} Items)
          </Button>
        </Navbar.Collapse>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {productsCount > 0 ? (
            <>
              <p>Items in your cart</p>
              {items.map((item, idx) => (
                <ProductCard id={item.id} key={idx} />
              ))}

              <h1>
                Total Cost: {getTotalCost().toFixed(2)}
              </h1>

              <Button variant="success" onClick={checkout}>
                Purchase items!
              </Button>
            </>
          ) : (
            <h1>
              Search for your favouite items and get them
              now!!
            </h1>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
