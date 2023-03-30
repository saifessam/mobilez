import { useState } from 'react';
import Section from "../../components/section";
import Sidebar from "./components/sidebar";
import useAuthToken from '../../hooks/useAuthToken';
import useWindowSize from '../../hooks/useWindowSize';
import AuthorizationForm from './components/authorization';
import ProfileDetailsPage from "./components/details";
import DashboardDevicesPage from './components/manage-devices';
import DashboardOrdersPage from './components/manage-orders';
import DashboardUsersPage from './components/manage-users';
import ProfileOrdersPage from "./components/orders";

function ProfilePage() {
	const [tab, setTab] = useState<number>(0);
	const authToken = useAuthToken();
	const windowSize = useWindowSize();
	const tabs: JSX.Element[] = [<ProfileDetailsPage />, <ProfileOrdersPage />, <DashboardDevicesPage />, <DashboardOrdersPage />, <DashboardUsersPage />];

	if (!authToken) {
		return <AuthorizationForm />;
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