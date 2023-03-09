import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import Button from '../button';
import { ReactComponent as AccountIcon } from './../../assets/svgs/icons/account.svg';
import { ReactComponent as CartIcon } from './../../assets/svgs/icons/cart.svg';
import { ReactComponent as ChartIcon } from './../../assets/svgs/icons/chart.svg';
import { ReactComponent as HomeIcon } from './../../assets/svgs/icons/home.svg';
import { ReactComponent as LogoutIcon } from './../../assets/svgs/icons/logout.svg';
import { ReactComponent as MessageIcon } from './../../assets/svgs/icons/message.svg';
import { ReactComponent as ProductsIcon } from './../../assets/svgs/icons/products.svg';
import './style.css';

function Menu() {
	const { pathname } = useLocation();
	const { isToggled } = useSelector((state: any) => state.menu);
	const authToken = useAuthToken();
	const navigate = useNavigate();

	async function handleSignOut(): Promise<void> {
		try {
			await fetch("http://localhost:4000/users/deauthorize", { method: "GET", cache: "no-store", credentials: "include" });
			navigate('/', { replace: true });
		} catch (error) {
			console.error("Request error", error);
		}
	}

	return (
		<aside className={isToggled ? 'menu active' : 'menu'}>
			<div className="menu-header"><span>Menu</span></div>
			<div className="menu-body">
				<ul>
					<li><Link to={'/'} className={pathname === "/" ? "active" : undefined}>Home <HomeIcon /></Link></li>
					<li><Link to={authToken ? `/users/profile/${authToken.id}` : '/users/authorize'} className={pathname?.split('/')[1] === "users" ? "active" : undefined}>Profile <AccountIcon /></Link></li>
					<li><Link to={'/devices'} className={pathname?.split('/')[1] === "devices" ? "active" : undefined}>Devices <ProductsIcon /></Link></li>
					<li><Link to={'/announcements'} className={pathname?.split('/')[1] === "announcements" ? "active" : undefined}>Announcements <MessageIcon /></Link></li>
					{authToken ? <li><Link to={'/cart'} className={pathname?.split('/')[1] === "cart" ? "active" : undefined}>Cart <CartIcon /></Link></li> : undefined}
				</ul>
				<ul>
					{authToken && authToken.role === 'ADMIN' ? <li><Link to={'/dashboard/devices'} className={pathname?.split('/')[1] === "dashboard" ? "active" : undefined}>Dashboard <ChartIcon /></Link></li> : undefined}
					{authToken ? <li><Button type='button' action={handleSignOut} icon={<LogoutIcon />} label="Sign out" primary /></li> : undefined}
				</ul>
			</div>
		</aside>
	);
}

export default Menu;