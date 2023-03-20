import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer";
import Main from "../components/main";
import Navbar from "../components/navbar";
import useAuthToken from "../hooks/useAuthToken";
import DevicePage from "../pages/devices/one";
import UserAuthorizationPage from '../pages/users/authorize';
import UserCreationPage from '../pages/users/create';
import CartPage from './../pages/cart';
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
			<Navbar />
			<Main>
				<Routes>
					<Route path='*' element={<ErrorPage />} />
					<Route index element={<HomePage />} />
					<Route path='devices'>
						<Route path=':id' element={<DevicePage />} />
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