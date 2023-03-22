import { Route, Routes } from "react-router-dom";
import Footer from "../components/footer";
import Main from "../components/main";
import Navbar from "../components/navbar";
import useAuthToken from "../hooks/useAuthToken";
import ProfilePage from "../pages/profile";
import CartPage from './../pages/cart';
import ErrorPage from './../pages/error';
import HomePage from './../pages/home';

function MainLayout() {
	const authToken = useAuthToken();

	return (
		<>
			<Navbar />
			<Main>
				<Routes>
					<Route path='*' element={<ErrorPage />} />
					<Route index element={<HomePage />} />
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