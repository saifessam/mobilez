import Navigator from "../../../components/navigator";
import Section from "./../../../components/section";

function DashboardOrdersPage() {
	return (
		<Section alignment="row" addSpacing>
			<Navigator />
			<Section alignment="column" addSpacing></Section>
			<Section alignment="column" addSpacing></Section>
		</Section>
	);
}

export default DashboardOrdersPage;