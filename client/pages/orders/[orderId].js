import Router from 'next/router';
import { useEffect, useState } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id
    },
    onSuccess: () => Router.push('/orders'),
  }
  )
  //return <div>Order Expired</div>;

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  if (timeLeft < 0) {
    return <div>Order Expired</div>;
  }

  return <div>Time left to pay: {timeLeft} seconds <br />
  Working card number: 4242 4242 4242 4242 <br />
  Other Values Random <br />
    <StripeCheckout
      token={({ id }) => doRequest({ token: id })}
      stripeKey="pk_test_51IVl5bHyziJOohxULuiXO1IfYXLVZpNvZlzhPRr5YUVKfAuSnzJQCa0aiUgZ1WSyQh6pWTcI1Z6AMNbY3EibAZYV00RZh5vISw"
      amount={order.ticket.price * 100}
    //email={currentUser.email}
    />
    {errors}
  </div>;
};

OrderShow.getInitialProps = async (context, client) => {
  //console.log('in order iddddd');
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
