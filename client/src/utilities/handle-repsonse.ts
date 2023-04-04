import { NavigateFunction } from "react-router-dom";
import Message from "../types/message";

interface Props {
	setMessage: React.Dispatch<React.SetStateAction<Message>>;
	response: Message;
	navigate: NavigateFunction;
}

function handleResponse({ setMessage, response, navigate }: Props): void {
	setMessage(response);
	if (response.succeed) setTimeout(() => {
		navigate('/', { replace: true });
		window.location.reload();
	}, 1000);
};

export default handleResponse;