export const generateFetchBody = (after, endCursor) => {
  console.log("after",after);
  console.log("cursor",endCursor);
  const argument1String = after ? "first" : "last";
  const argument2String = after ? "after" : "before";
  const cursorString = endCursor == null ? "null" : `"${endCursor}"`;
  return JSON.stringify({
    query: `{
  products(${argument1String}: 10, ${argument2String}: ${cursorString}) {
    edges {
      node {
        description
        price
        productCode
        productId
        productName
        stock
        categories {
          categoryName
        }
      }
    }
    pageInfo {
      endCursor
      startCursor
    }
  }
}
        `,
  });
};

export const initialProducts = [
  {
    id: 1,
    title: "Product 1",
    code: "P1001",
    description: "A great product",
    price: 100,
    stock: 10,
    quantity: 0,
  },
  {
    id: 2,
    title: "Product 2",
    code: "P1002",
    description: "Another great product",
    price: 150,
    stock: 5,
    quantity: 0,
  },
  {
    id: 3,
    title: "Product 3",
    code: "P1003",
    description: "Yet another great product",
    price: 200,
    stock: 3,
    quantity: 0,
  },
  {
    id: 4,
    title: "Product 4",
    code: "P1004",
    description: "The last great product",
    price: 250,
    stock: 7,
    quantity: 0,
  },
  {
    id: 5,
    title: "Product 5",
    code: "P1005",
    description: "The final great product",
    price: 300,
    stock: 2,
    quantity: 0,
  },
  {
    id: 6,
    title: "Product 6",
    code: "P1006",
    description: "The ultimate great product",
    price: 350,
    stock: 1,
    quantity: 0,
  },
];
