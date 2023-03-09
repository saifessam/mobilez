import { Route, Routes } from "react-router-dom";
import Search from "../components/search";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import Main from "../components/main";
import Footer from "../components/footer";
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
import useAuthToken from "../hooks/useAuthToken";
import AnnouncementsPage from "../pages/announcements";

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
						<Route path=':id' element={<></>} />
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