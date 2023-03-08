import { useLocation, Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Icons from './../../data/icons';
import Button from '../button';
import './style.css';

function Menu() {
	const { pathname } = useLocation();
	const { isToggled } = useSelector((state: any) => state.menu);
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
			<div className="menu-header">
				<span>Menu</span>
				<Button type='button' action={handleSignOut} icon={<Icons.LogoutIcon />} />
			</div>
			<div className="menu-body">
				<ul>
					<li><Link to={'/'} className={pathname === "/" ? "active" : undefined}><Icons.HomeIcon /> Home</Link></li>
					<li><Link to={'/users/sign-up'} className={pathname?.split('/')[1] === "users" ? "active" : undefined}><Icons.AccountIcon /> Profile</Link></li>
					<li><Link to={'/cart'} className={pathname?.split('/')[1] === "cart" ? "active" : undefined}><Icons.CartIcon /> Cart</Link></li>
					<li><Link to={'/devices'} className={pathname?.split('/')[1] === "devices" ? "active" : undefined}><Icons.ProductsIcon /> Devices</Link></li>
				</ul>
				<ul>
					<li><Link to={'/dashboard/devices'} className={pathname?.split('/')[1] === "dashboard" ? "active" : undefined}><Icons.ChartIcon /> Dashboard</Link></li>
				</ul>
			</div>
		</aside>
	);
}

export default Menu;