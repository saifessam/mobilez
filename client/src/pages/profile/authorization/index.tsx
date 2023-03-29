import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../components/form';
import EmailInput from '../../../components/inputs/email';
import PasswordInput from '../../../components/inputs/password';
import Section from '../../../components/section';
import Message from '../../../types/message';
import UserType from '../../../types/user';
import handleResult from '../../../utilities/handle-result';

function AuthorizationForm() {
	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const navigate = useNavigate();

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(data)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response = await fetch("/users/authorize", options);
			const result = await response.json();
			handleResult({ setMessage, result, navigate });
		} catch (error) {
			console.error("Request error", error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<Section alignment='main' centerContent>
			<Form onSubmit={handleSubmit} title='Welcome' message={message} loading={loading}>
				<EmailInput setter={setData} />
				<PasswordInput setter={setData} />
			</Form>
		</Section>
	);
}

export default AuthorizationForm;