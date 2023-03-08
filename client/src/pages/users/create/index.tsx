import { useState, SyntheticEvent } from "react";
import Section from "../../../components/section";
import Form from "../../../components/form";
import TextInput from "../../../components/inputs/text";
import PasswordInput from "../../../components/inputs/password";
import EmailInput from "../../../components/inputs/email";
import PhoneInput from "../../../components/inputs/phone";
import { useNavigate } from "react-router-dom";
import UserData from "../../../types/user-data";
import Message from "../../../types/message";

function UserCreationPage() {
	const [data, setData] = useState<UserData>({ name: null, email: null, phone: null, password: null });
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const navigate = useNavigate();

	function handleCreation(data: Message) {
		setMessage(data);
		if (data.succeed) setTimeout(() => navigate('/', { replace: true }), 2500);
	}

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);
		try {
			const options: RequestInit = { method: "POST", headers: { "Accept": "application/json", "Content-Type": "application/json" }, body: JSON.stringify(data), cache: "no-store", credentials: "include" };
			const response = await fetch("/users/create", options);
			await response.json().then((data) => handleCreation(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setLoading(false);
	}

	return (
		<Section alignment='main' centerContent>
			<Form onSubmit={handleSubmit} title='Sign Up' link={{ path: "/users/sign-in", label: "Sign in here" }} message={message} loading={loading} assistance>
				<TextInput name="name" label='Full name' placeholder='Saif Essam' setter={setData} />
				<EmailInput setter={setData} />
				<PhoneInput setter={setData} />
				<PasswordInput setter={setData} />
			</Form>
		</Section>
	);
}

export default UserCreationPage;