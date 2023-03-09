import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer";
import Main from "../components/main";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import Search from "../components/search";
import useAuthToken from "../hooks/useAuthToken";
import AnnouncementsPage from "../pages/announcements";
import DevicesPage from '../pages/devices/all';
import DevicePage from "../pages/devices/one";
import UserAuthorizationPage from '../pages/users/authorize';
import UserCreationPage from '../pages/users/create';
import CartPage from './../pages/cart';
import DashboardAnnouncementsPage from './../pages/dashboard/announcements';
import DashboardDevicesPage from './../pages/dashboard/devices';
import DashboardOrdersPage from './../pages/dashboard/orders';
import DashboardUsersPage from './../pages/dashboard/users';
import ErrorPage from './../pages/error';
import HomePage from './../pages/home';
import ProfilePage from './../pages/users/profile';

function MainLayout() {
	const authToken = useAuthToken();

	return (
		<>
			<Search />
			<Menu />
			<Navbar />
			<Main>
				<Routes>
					<Route path='*' element={<ErrorPage />} />
					<Route index element={<HomePage />} />
					<Route path='devices'>
						<Route index element={<DevicesPage />} />
						<Route path=':id' element={<DevicePage />} />
					</Route>
					<Route path='announcements'>
						<Route index element={<AnnouncementsPage />} />
						<Route path=':id' element={<></>} />
					</Route>
					<Route path={authToken ? 'cart' : undefined}>
						<Route index element={<CartPage />} />
						<Route path='checkout' element={<></>} />
					</Route>
					<Route path='users'>
						<Route path={authToken ? undefined : 'authorize'} element={<UserAuthorizationPage />} />
						<Route path={authToken ? undefined : 'create'} element={<UserCreationPage />} />
						<Route path={authToken ? 'profile/:id' : undefined} element={<ProfilePage />} />
					</Route>
					<Route path={authToken && authToken.role === "ADMIN" ? 'dashboard' : undefined}>
						<Route path='devices' element={<DashboardDevicesPage />} />
						<Route path='announcements' element={<DashboardAnnouncementsPage />} />
						<Route path='orders' element={<DashboardOrdersPage />} />
						<Route path='users' element={<DashboardUsersPage />} />
					</Route>
				</Routes>
			</Main>
			<Footer />
		</>
	);
}

export default MainLayout;