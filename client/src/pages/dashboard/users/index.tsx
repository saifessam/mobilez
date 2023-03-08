import Navigator from "../../../components/navigator";
import Section from "./../../../components/section";

function DashboardUsersPage() {
	return (
		<Section alignment="main" addSpacing>
			<Navigator />
			<Section alignment="row" addSpacing>
				<Section alignment="column" addSpacing></Section>
				<Section alignment="column" fitContent></Section>
			</Section>
		</Section>
	);
}

export default DashboardUsersPage;