import { Link } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import './style.css';

function Navbar() {
	const authToken = useAuthToken();

	return (
		<nav>
			<Link to={'/'}><span>Mobilez</span></Link>
			<ul>
				<li><Link to={'/profile'}>Profile</Link></li>
				{authToken ? <li><Link to={'/cart'}>Cart</Link></li> : undefined}
			</ul>
		</nav>
	);
}

export default Navbar;