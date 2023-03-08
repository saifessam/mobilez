import Search from "../components/search";
import Menu from "../components/menu";
import Navbar from "../components/navbar";
import Main from "../components/main";
import Footer from "../components/footer";
import MainRoutes from "../routes/main";

function MainLayout() {
	return (
		<>
			<Search />
			<Menu />
			<Navbar />
			<Main>
				<MainRoutes />
			</Main>
			<Footer />
		</>
	);
}

export default MainLayout;