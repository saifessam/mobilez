import { Link } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import './style.css';

function Navbar() {
	const authToken = useAuthToken();

	return (
		<nav>
			<Link to={'/'}><span>Mobilez</span></Link>
			<ul>
				<li><Link to={'/search'}>Search</Link></li>
				<li><Link to={authToken ? `/users/profile/${authToken.id}` : '/users/authorize'}>Account</Link></li>
				{authToken ? <li><Link to={'/cart'}>Cart</Link></li> : undefined}
				{authToken && authToken.role === 'ADMIN' ? <li><Link to={'/dashboard/devices'}>Dashboard</Link></li> : undefined}
			</ul>
		</nav>
	);
}

export default Navbar;