import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as MessageIcon } from './../../assets/svgs/icons/message.svg';
import { ReactComponent as OrdersIcon } from './../../assets/svgs/icons/orders.svg';
import { ReactComponent as ProductsIcon } from './../../assets/svgs/icons/products.svg';
import { ReactComponent as UsersIcon } from './../../assets/svgs/icons/users.svg';
import Button from './../../components/button';
import './style.css';

function Navigator() {
	const { pathname } = useLocation();

	return (
		<div className='navigator'>
			<ul>
				<li>
					<Link to={'/dashboard/devices'}>
						<Button type='button' icon={<ProductsIcon />} primary={pathname === "/dashboard/devices" ? true : undefined} />
					</Link>
				</li>
				<li>
					<Link to={'/dashboard/orders'}>
						<Button type='button' icon={<OrdersIcon />} primary={pathname === "/dashboard/orders" ? true : undefined} />
					</Link>
				</li>
				<li>
					<Link to={'/dashboard/users'}>
						<Button type='button' icon={<UsersIcon />} primary={pathname === "/dashboard/users" ? true : undefined} />
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navigator;