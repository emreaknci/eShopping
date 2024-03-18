import { OrderStatus, OrderStatusColor } from "../../../mock/order";


const orderStatusStyles = (status: OrderStatus) => ({
  backgroundColor: OrderStatusColor[status],
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '5rem',
  padding: '.5rem',
  color: 'white'
});


const styles = {
  orderStatusStyles
}

export default styles;