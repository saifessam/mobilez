import Message from "../components/message";
import Section from "../components/section";

function ErrorPage() {
	return (
		<Section alignment="main" centerContent>
			<Message message="ERROR 404" decription="Seems like you have entered a wrong page!" contidition="fail" redirect="/" />
		</Section>
	);
}

export default ErrorPage;