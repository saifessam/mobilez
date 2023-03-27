import currencyFormat from '../../utilities/currency-format';
import Button from '../button';
import './style.css';

interface Props {
	count: number;
	totalCount: number;
	price: number;
}

function Checkout(props: Props) {
	return (
		<div className='checkout'>
			<div className="checkout-header">
				<span>Cart Checkout</span>
			</div>
			<div className="checkout-body">
				<div className="checkout-body-item">
					<span>Devices count</span>
					<span>{props.count}</span>
				</div>
				<div className="checkout-body-item">
					<span>Total count</span>
					<span>{props.totalCount}</span>
				</div>
				<div className="checkout-body-item">
					<span>Price</span>
					<span>{currencyFormat(props.price)}</span>
				</div>
				<div className="checkout-body-item">
					<span>Fees</span>
					<span>10% ({currencyFormat(props.price * 0.10)})</span>
				</div>
				<div className="checkout-body-item">
					<span>Grand total</span>
					<span>{currencyFormat(props.price + (props.price * 0.10))}</span>
				</div>
			</div>
			<div className="checkout-footer">
				<Button type='button' condition='primary' label='Buy now' />
			</div>
		</div>
	);
}

export default Checkout;