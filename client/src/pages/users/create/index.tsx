import { SyntheticEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../../../components/form";
import EmailInput from "../../../components/inputs/email";
import PasswordInput from "../../../components/inputs/password";
import PhoneInput from "../../../components/inputs/phone";
import TextInput from "../../../components/inputs/text";
import Section from "../../../components/section";
import Message from "../../../types/message";
import UserType from "../../../types/user";
import handleResult from "../../../utilities/handle-result";

function UserCreationPage() {
	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const navigate = useNavigate();

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(data)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response = await fetch("/users/create", options);
			const result: Message = await response.json();
			handleResult({ setMessage, result, navigate });
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Section alignment='main' centerContent>
			<Form onSubmit={handleSubmit} title='Sign Up' link={{ path: "/users/authorize", label: "Sign in here" }} message={message} loading={loading} assistance>
				<TextInput name="name" label='Full name' placeholder='Saif Essam' setter={setData} />
				<EmailInput setter={setData} />
				<PhoneInput setter={setData} />
				<PasswordInput setter={setData} />
			</Form>
		</Section>
	);
}

export default UserCreationPage;