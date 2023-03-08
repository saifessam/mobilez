import { Route, Routes } from "react-router-dom";
import ErrorPage from './../pages/error';
import HomePage from './../pages/home';
import DevicesPage from './../pages/devices';
import CartPage from './../pages/cart';
import UserCreationPage from '../pages/users/create';
import UserAuthorizationPage from '../pages/users/authorize';
import ProfilePage from './../pages/users/profile';
import DashboardDevicesPage from './../pages/dashboard/devices';
import DashboardOrdersPage from './../pages/dashboard/orders';
import DashboardAnnouncementsPage from './../pages/dashboard/announcements';
import DashboardUsersPage from './../pages/dashboard/users';

function MainRoutes() {
	return (
		<Routes>
			<Route path='*' element={<ErrorPage />} />
			<Route index element={<HomePage />} />
			<Route path='devices'>
				<Route index element={<DevicesPage />} />
				<Route path=':id' element={<></>} />
			</Route>
			<Route path='cart'>
				<Route index element={<CartPage />} />
				<Route path='checkout' element={<></>} />
			</Route>
			<Route path='users'>
				<Route path='authorize' element={<UserAuthorizationPage />} />
				<Route path='create' element={<UserCreationPage />} />
				<Route path='profile/:id' element={<ProfilePage />} />
			</Route>
			<Route path='dashboard'>
				<Route path='devices' element={<DashboardDevicesPage />} />
				<Route path='announcements' element={<DashboardAnnouncementsPage />} />
				<Route path='orders' element={<DashboardOrdersPage />} />
				<Route path='users' element={<DashboardUsersPage />} />
			</Route>
		</Routes>
	);
}

export default MainRoutes;