import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer";
import Main from "../components/main";
import Navbar from "../components/navbar";
import useAuthToken from "../hooks/auth-token";
import CartPage from '../pages/cart-page';
import DevicePage from "../pages/device-page";
import DevicesPage from "../pages/devices-page";
import ErrorPage from '../pages/error-page';
import HomePage from '../pages/home-page';
import ProfilePage from "../pages/profile-page";

function MainLayout() {
	const authToken = useAuthToken();

	return (
		<>
			<Navbar />
			<Main>
				<Routes>
					<Route path='*' element={<ErrorPage />} />
					<Route index element={<HomePage />} />
					<Route path={'devices'}>
						<Route index element={<DevicesPage />} />
						<Route path=':id' element={<DevicePage />} />
					</Route>
					<Route path={authToken ? 'cart' : undefined}>
						<Route index element={<CartPage />} />
						<Route path='checkout' element={<></>} />
					</Route>
					<Route path='profile' element={<ProfilePage />} />
				</Routes>
			</Main>
			<Footer />
		</>
	);
}

export default MainLayout;