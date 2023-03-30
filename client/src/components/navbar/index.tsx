import { Link } from 'react-router-dom';
import useAuthToken from '../../hooks/auth-token';
import './style.css';

function Navbar() {
	const authToken = useAuthToken();

	return (
		<nav>
			<Link to={'/'}><span>Mobilez</span></Link>
			<ul>
				<li><Link to={'/profile'}>{!authToken ? "Join" : "Profile"}</Link></li>
				{!authToken ? undefined : <li><Link to={'/cart'}>Cart</Link></li>}
			</ul>
		</nav>
	);
}

export default Navbar;