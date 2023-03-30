import { SyntheticEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from '../../../../components/form';
import EmailInput from '../../../../components/inputs/email';
import PasswordInput from '../../../../components/inputs/password';
import Section from '../../../../components/section';
import authorizeUser from '../../services/authorize-user';
import Message from '../../../../types/message';
import UserType from '../../../../types/user';

function AuthorizationForm() {
	const [data, setData] = useState<UserType>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const navigate = useNavigate();

	return (
		<Section alignment='main' centerContent>
			<Form onSubmit={(event: SyntheticEvent) => authorizeUser({ event, data, setLoading, setMessage, navigate })} title='Welcome' message={message} loading={loading}>
				<EmailInput setter={setData} />
				<PasswordInput setter={setData} />
			</Form>
		</Section>
	);
}

export default AuthorizationForm;