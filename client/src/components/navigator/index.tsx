import { Link, useLocation } from 'react-router-dom';
import Button from './../../components/button';
import Icons from './../../data/icons';
import './style.css';

function Navigator() {
	const { pathname } = useLocation();

	return (
		<div className='navigator'>
			<ul>
				<li>
					<Link to={'/dashboard/devices'}>
						<Button type='button' icon={<Icons.ProductsIcon />} primary={pathname === "/dashboard/devices" ? true : undefined} />
					</Link>
				</li>
				<li>
					<Link to={'/dashboard/announcements'}>
						<Button type='button' icon={<Icons.MessageIcon />} primary={pathname === "/dashboard/announcements" ? true : undefined} />
					</Link>
				</li>
				<li>
					<Link to={'/dashboard/orders'}>
						<Button type='button' icon={<Icons.OrdersIcon />} primary={pathname === "/dashboard/orders" ? true : undefined} />
					</Link>
				</li>
				<li>
					<Link to={'/dashboard/users'}>
						<Button type='button' icon={<Icons.UsersIcon />} primary={pathname === "/dashboard/users" ? true : undefined} />
					</Link>
				</li>
			</ul>
		</div>
	);
}

export default Navigator;