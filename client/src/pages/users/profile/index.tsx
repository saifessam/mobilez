import { useState } from 'react';
import Section from "../../../components/section";
import Sidebar from "../../../components/sidebar";
import ProfileAddressPage from '../../../pages/users/profile/address';
import ProfileDetailsPage from "../../../pages/users/profile/details";
import DashboardDevicesPage from '../../../pages/users/profile/manage-devices';
import DashboardOrdersPage from '../../../pages/users/profile/manage-orders';
import DashboardUsersPage from '../../../pages/users/profile/manage-users';
import ProfileOrdersPage from "../../../pages/users/profile/orders";

function ProfilePage() {
	const [index, setIndex] = useState<number>(0);
	const tabs: JSX.Element[] = [<ProfileDetailsPage />, <ProfileAddressPage />, <ProfileOrdersPage />, <DashboardDevicesPage />, <DashboardOrdersPage />, <DashboardUsersPage />];

	return (
		<Section alignment="row" addSpacing>
			<Sidebar state={{ index, setIndex }} />
			{tabs[index]}
		</Section>
	);
}

export default ProfilePage;