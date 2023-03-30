import { useNavigate } from 'react-router-dom';
import useAuthToken from '../../../../hooks/useAuthToken';
import deauthorizeUser from '../../services/deauthorize-user';
import Button from '../../../../components/button';
import './style.css';

interface Props {
	state: { tab: number, setTab: React.Dispatch<React.SetStateAction<number>>; };
}

function Sidebar(props: Props) {
	const authToken = useAuthToken();
	const navigate = useNavigate();

	return (
		<aside>
			<ul>
				<li><Button type="button" condition={props.state.tab === 0 ? "primary" : "secondary"} label="Account details" action={() => props.state.setTab(0)} /></li>
				<li><Button type="button" condition={props.state.tab === 1 ? "primary" : "secondary"} label="Placed orders" action={() => props.state.setTab(1)} /></li>
				{authToken && authToken.admin ? <li><Button type="button" condition={props.state.tab === 2 ? "primary" : "secondary"} label="Manage devices" action={() => props.state.setTab(2)} /></li> : undefined}
				{authToken && authToken.admin ? <li><Button type="button" condition={props.state.tab === 3 ? "primary" : "secondary"} label="Manage orders" action={() => props.state.setTab(3)} /></li> : undefined}
				{authToken && authToken.admin ? <li><Button type="button" condition={props.state.tab === 4 ? "primary" : "secondary"} label="Manage users" action={() => props.state.setTab(4)} /></li> : undefined}
			</ul>
			<Button type='button' condition='fail' label='Sign out' action={() => deauthorizeUser(navigate)} />
		</aside>
	);
}

export default Sidebar;