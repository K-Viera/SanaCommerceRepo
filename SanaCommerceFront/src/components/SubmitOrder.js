import { useSelector,useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { resetCart } from '../redux/CartSlice';


const MySwal = withReactContent(Swal);

const useSubmitOrder = () => {
  const dispatch = useDispatch();
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
    if (responseData.errors){

      MySwal.fire({
        title: 'Error!',
        text: responseData.errors[0].message,
        icon: 'error',
        confirmButtonText: 'OK'
      });
      return;
    }
    if (responseData.data) {
      MySwal.fire({
        title: 'Success!',
        text: 'Order processed successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      dispatch(resetCart())
    }
  };

  return submitOrder;
};

export default useSubmitOrder;