import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icons from './../../data/icons';
import Button from '../button';
import useAuthToken from '../../hooks/useAuthToken';
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
					<li><Link to={'/'} className={pathname === "/" ? "active" : undefined}>Home <Icons.HomeIcon /></Link></li>
					<li><Link to={authToken ? `/users/profile/${authToken.id}` : '/users/authorize'} className={pathname?.split('/')[1] === "users" ? "active" : undefined}>Profile <Icons.AccountIcon /></Link></li>
					<li><Link to={'/devices'} className={pathname?.split('/')[1] === "devices" ? "active" : undefined}>Devices <Icons.ProductsIcon /></Link></li>
					{authToken ? <li><Link to={'/cart'} className={pathname?.split('/')[1] === "cart" ? "active" : undefined}>Cart <Icons.CartIcon /></Link></li> : undefined}
				</ul>
				<ul>
					{authToken && authToken.role === 'ADMIN' ? <li><Link to={'/dashboard/devices'} className={pathname?.split('/')[1] === "dashboard" ? "active" : undefined}>Dashboard <Icons.ChartIcon /></Link></li> : undefined}
					{authToken ? <li><Button type='button' action={handleSignOut} icon={<Icons.LogoutIcon />} label="Sign out" primary /></li> : undefined}
				</ul>
			</div>
		</aside>
	);
}

export default Menu;