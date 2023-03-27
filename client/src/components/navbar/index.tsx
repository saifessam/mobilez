import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import OrderType from '../../types/order';
import './style.css';

function Navbar() {
	const [count, setCount] = useState<number>(0);
	const authToken = useAuthToken();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getCartItemslength(id: string) {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default", credentials: "include" };
				const response: OrderType = await (await fetch(`/orders/cart/${id}`, options)).json();
				setCount(response.items.length);
			} catch (error) {
				console.error("Request error", error);
			}
		}

		if (authToken) getCartItemslength(authToken.id);
		return () => controller.abort();
	}, [authToken]);

	return (
		<nav>
			<Link to={'/'}><span>Mobilez</span></Link>
			<ul>
				<li><Link to={'/profile'}>Profile</Link></li>
				{authToken ? <li><Link to={'/cart'}>Cart ({count})</Link></li> : undefined}
			</ul>
		</nav>
	);
}

export default Navbar;