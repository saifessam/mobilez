import { useState } from 'react';
import AdminDevices from '../components/account/admin/devices';
import AdminOrders from '../components/account/admin/orders';
import AdminUsers from '../components/account/admin/users';
import UserAddress from '../components/account/user/address';
import UserAuthorization from '../components/account/user/authorization';
import UserDetails from '../components/account/user/details';
import UserOrders from '../components/account/user/orders';
import Section from "../components/section";
import Sidebar from "../components/sidebar";
import useAuthToken from '../hooks/auth-token';
import useWindowSize from '../hooks/window-size';

function ProfilePage() {
	const [tab, setTab] = useState<number>(0);
	const authToken = useAuthToken();
	const windowSize = useWindowSize();
	const tabs: JSX.Element[] = [<UserDetails />, <UserAddress />, <UserOrders />, <AdminDevices />, <AdminOrders />, <AdminUsers />];

	if (!authToken) {
		return <UserAuthorization />;
	} else {
		return (
			<Section alignment={windowSize.width! < 1023 ? "column" : "row"} addSpacing>
				<Sidebar state={{ tab, setTab }} />
				{tabs[tab]}
			</Section>
		);
	}
}

export default ProfilePage;