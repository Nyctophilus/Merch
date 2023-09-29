// sk_test_51LYaBbD2ZUSkOc0qXG93XYiIbY3ck1n77toC3XcDhnH8nu1be8zDOkgzYOlgFLLOHnAHFcF9YONEIrKLgyweBUKD00IUWpSqAL
// Coffe: price_1NvlcpD2ZUSkOc0qeEQW1iSj
// Sunglasses: price_1NvleID2ZUSkOc0qT9K2Gjr1
// Camera: price_1Nvlf8D2ZUSkOc0qIfsOtRci

const productsArray = [
  {
    id: "price_1NvlcpD2ZUSkOc0qeEQW1iSj",
    title: "Coffee",
    price: 4.99,
  },
  {
    id: "price_1NvleID2ZUSkOc0qT9K2Gjr1",
    title: "Sunglasses",
    price: 9.99,
  },
  {
    id: "price_1Nvlf8D2ZUSkOc0qIfsOtRci",
    title: "Camera",
    price: 39.99,
  },
];

function getProductData(id) {
  let productData = productsArray.find(
    (product) => product.id === id
  );

  if (productData === undefined) {
    console.log("Product not found!");
    return undefined;
  }

  return productData;
}

export { productsArray, getProductData };
