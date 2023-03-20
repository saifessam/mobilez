import Button from '../button';
import './style.css';

function Checkout() {
	return (
		<div className='checkout'>
			<div className="checkout-header">
				<span>Cart Checkout</span>
			</div>
			<div className="checkout-body">

			</div>
			<div className="checkout-footer">
				<Button type='button' condition='primary' label='Buy now' />
			</div>
		</div>
	);
}

export default Checkout;