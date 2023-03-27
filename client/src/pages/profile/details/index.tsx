import { SyntheticEvent, useEffect, useState } from "react";
import Form from "../../../components/form";
import EmailInput from "../../../components/inputs/email";
import PhoneInput from "../../../components/inputs/phone";
import TextInput from "../../../components/inputs/text";
import Loading from "../../../components/loading";
import Section from "../../../components/section";
import useAuthToken from "../../../hooks/useAuthToken";
import Message from "../../../types/message";
import UserType from "../../../types/user";

function ProfileDetailsPage() {
	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const authToken = useAuthToken();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getUserData(id: string) {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response: UserType = await (await fetch(`/users/${id}`, options)).json();
				setData(response);
			} catch (error) {
				console.error("Request error", error);
			}
		}

		if (authToken) getUserData(authToken.id);
		return () => controller.abort();
	}, [authToken]);

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);
		try {
			const options: RequestInit = { method: "PUT", body: new Blob([JSON.stringify(data)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response: Message = await (await fetch("/users/update", options)).json();
			setMessage(response);
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}

	if (!data) {
		return <Loading message="Loading user data..." />;
	} else {
		return (
			<Section alignment="main" centerContent>
				<Form onSubmit={handleSubmit} title='Account Details' message={message} loading={loading}>
					<TextInput name="name" label="Name" placeholder="Set your name" value={data.name} setter={setData} />
					<EmailInput value={data.email} setter={setData} />
					<PhoneInput placeholder="Set your phone number" value={data.phone} setter={setData} />
				</Form>
			</Section>
		);
	}

}

export default ProfileDetailsPage;