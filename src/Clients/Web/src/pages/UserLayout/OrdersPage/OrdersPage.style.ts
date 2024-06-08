import { OrderStatusColor } from "../../../enums/orderStatus";

const orderStatusStyles = (statusNumber: keyof typeof OrderStatusColor) => (
  {
    backgroundColor: OrderStatusColor[statusNumber],
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