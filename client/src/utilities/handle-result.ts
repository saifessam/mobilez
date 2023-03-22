import { NavigateFunction } from "react-router-dom";
import Message from "../types/message";

interface Props {
	setMessage: React.Dispatch<React.SetStateAction<Message>>;
	result: Message;
	navigate: NavigateFunction;
}

function handleResult({ setMessage, result, navigate }: Props): void {
	setMessage(result);
	if (result.succeed) setTimeout(() => {
		navigate('/', { replace: true });
		window.location.reload();
	}, 2500);
};

export default handleResult;