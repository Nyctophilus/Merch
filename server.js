// sk_test_51LYaBbD2ZUSkOc0qXG93XYiIbY3ck1n77toC3XcDhnH8nu1be8zDOkgzYOlgFLLOHnAHFcF9YONEIrKLgyweBUKD00IUWpSqAL
// Coffe: price_1NvlcpD2ZUSkOc0qeEQW1iSj
// Sunglasses: price_1NvleID2ZUSkOc0qT9K2Gjr1
// Camera: price_1Nvlf8D2ZUSkOc0qIfsOtRci

const express = require("express");
var cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51LYaBbD2ZUSkOc0qXG93XYiIbY3ck1n77toC3XcDhnH8nu1be8zDOkgzYOlgFLLOHnAHFcF9YONEIrKLgyweBUKD00IUWpSqAL"
);

const app = express();
app.use(cors());
app.use(express.static("public"));
app.use(express.json());

app.post("/checkout", async (req, res) => {
  /*
	req.body.items = [
		{
			id: 1, 
			quantity: 3
		}
	]

	stripe wants 
	[
		{
			price: 1, 
			quantity: 3
		}
	]
	*/
  console.log(req.body);
  const items = req.body.items;
  let lineItems = [];
  items.forEach((item) => {
    lineItems.push({
      price: item.id,
      quantity: item.quantity,
    });
  });

  const session = await stripe.checkout.sessions.create({
    line_items: lineItems,
    mode: "payment",
    sucess_url: "http://localhost:3000/success",
    cancel_url: "http://localhost:3000/cancel",
  });

  res.send(
    JSON.stringify({
      url: session.url,
    })
  );
});

app.listen(4000, () =>
  console.log("listening on port 4000!")
);
