import { useSelector } from 'react-redux';

const useSubmitOrder = () => {
  const profile = useSelector((state) => state.profile);
  const cartItems = useSelector((state) => state.cart.items);

  const submitOrder = async () => {


    // build string like: [{ productId: 1, quantity: 4 }, { productId: 2, quantity: 3 }]
    // Without "" around the keys
    const orderLines = cartItems.map((item) => {
      return `{ productId: ${item.id}, quantity: ${item.quantity} }`
    });



    const mutation = `
      mutation {
        createOrder(
          orderRequest: {
            orderLines: [${orderLines.join(',')}]
            customerEmail: "${profile.email}"
            firstName: "${profile.firstName}"
            lastName: "${profile.lastName}"
          }
        ) {
          customerId
          orderDate
          orderId
        }
      }
    `;

    console.log('Processing order:', mutation);

    const response = await fetch("https://localhost:7233/graphql/", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        query: mutation,
      }),
    });

    const responseData = await response.json();
    console.log(responseData);
    return responseData.data
  };

  return submitOrder;
};

export default useSubmitOrder;