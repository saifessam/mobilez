import { useState } from 'react';
import Section from "../../components/section";
import Sidebar from "../../components/sidebar";
import useAuthToken from '../../hooks/useAuthToken';
import useWindowSize from '../../hooks/useWindowSize';
import AuthorizationForm from './authorization';
import ProfileDetailsPage from "./details";
import DashboardDevicesPage from './manage-devices';
import DashboardOrdersPage from './manage-orders';
import DashboardUsersPage from './manage-users';
import ProfileOrdersPage from "./orders";

function ProfilePage() {
	const [index, setIndex] = useState<number>(0);
	const authToken = useAuthToken();
	const windowSize = useWindowSize();
	const tabs: JSX.Element[] = [<ProfileDetailsPage />, <ProfileOrdersPage />, <DashboardDevicesPage />, <DashboardOrdersPage />, <DashboardUsersPage />];

	if (!authToken) {
		return <AuthorizationForm />;
	} else {
		return (
			<Section alignment={windowSize.width! < 1023 ? "column" : "row"} addSpacing>
				<Sidebar state={{ index, setIndex }} />
				{tabs[index]}
			</Section>
		);
	}
}

export default ProfilePage;