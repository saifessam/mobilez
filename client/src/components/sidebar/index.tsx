import { useNavigate } from 'react-router-dom';
import useAuthToken from '../../hooks/useAuthToken';
import Button from '../button';
import './style.css';

interface Props {
	state: { index: number, setIndex: React.Dispatch<React.SetStateAction<number>>; };
}

function Sidebar(props: Props) {
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
		<aside>
			<ul>
				<li className={props.state.index === 0 ? "active" : undefined} onClick={() => props.state.setIndex(0)}>Account details</li>
				<li className={props.state.index === 1 ? "active" : undefined} onClick={() => props.state.setIndex(1)}>Shipping address</li>
				<li className={props.state.index === 2 ? "active" : undefined} onClick={() => props.state.setIndex(2)}>Placed orders</li>
				{authToken && authToken.role === 'ADMIN' ? <li className={props.state.index === 3 ? "active" : undefined} onClick={() => props.state.setIndex(3)}>Manage devices</li> : undefined}
				{authToken && authToken.role === 'ADMIN' ? <li className={props.state.index === 4 ? "active" : undefined} onClick={() => props.state.setIndex(4)}>Manage orders</li> : undefined}
				{authToken && authToken.role === 'ADMIN' ? <li className={props.state.index === 5 ? "active" : undefined} onClick={() => props.state.setIndex(5)}>Manage users</li> : undefined}
			</ul>
			<Button type='button' label='Sign out' action={handleSignOut} primary />
		</aside>
	);
}

export default Sidebar;