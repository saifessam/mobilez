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
			window.location.reload();
		} catch (error) {
			console.error("Request error", error);
		}
	}

	return (
		<aside>
			<ul>
				<li><Button type="button" condition={props.state.index === 0 ? "primary" : "secondary"} label="Account details" action={() => props.state.setIndex(0)} /></li>
				<li><Button type="button" condition={props.state.index === 1 ? "primary" : "secondary"} label="Placed orders" action={() => props.state.setIndex(1)} /></li>
				{authToken && authToken.admin ? <li><Button type="button" condition={props.state.index === 2 ? "primary" : "secondary"} label="Manage devices" action={() => props.state.setIndex(2)} /></li> : undefined}
				{authToken && authToken.admin ? <li><Button type="button" condition={props.state.index === 3 ? "primary" : "secondary"} label="Manage orders" action={() => props.state.setIndex(3)} /></li> : undefined}
				{authToken && authToken.admin ? <li><Button type="button" condition={props.state.index === 4 ? "primary" : "secondary"} label="Manage users" action={() => props.state.setIndex(4)} /></li> : undefined}
			</ul>
			<Button type='button' condition='fail' label='Sign out' action={handleSignOut} />
		</aside>
	);
}

export default Sidebar;