import { SyntheticEvent, useEffect, useState } from "react";
import Form from "../../../components/form";
import EmailInput from "../../../components/inputs/email";
import PhoneInput from "../../../components/inputs/phone";
import TextInput from "../../../components/inputs/text";
import Loading from "../../../components/loading";
import Section from "../../../components/section";
import useAuthToken from "../../../hooks/auth-token";
import getUser from "../../../services/get-user";
import updateUser from "../../../services/update-user";
import Message from "../../../types/message";
import UserType from "../../../types/user";

function UserDetails() {
	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const authToken = useAuthToken();

	useEffect(() => {
		const controller: AbortController = new AbortController();
		if (authToken) getUser({ id: authToken.id, setData });
		return () => controller.abort();
	}, [authToken]);

	if (!data) {
		return <Loading message="Loading user data..." />;
	} else {
		return (
			<Section alignment="main" centerContent>
				<Form onSubmit={(event: SyntheticEvent) => updateUser({ event, data, setLoading, setMessage })} title='Account Details' message={message} loading={loading}>
					<TextInput name="name" label="Name" placeholder="Set your name" value={data.name} setter={setData} />
					<EmailInput value={data.email} setter={setData} />
					<PhoneInput placeholder="Set your phone number" value={data.phone} setter={setData} />
				</Form>
			</Section>
		);
	}

}

export default UserDetails;