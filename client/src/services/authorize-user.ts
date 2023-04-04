import { SyntheticEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import Message from "../types/message";
import UserType from "../types/user";
import handleResponse from "../utilities/handle-repsonse";

interface Props {
	event: SyntheticEvent;
	data: UserType | undefined;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setMessage: React.Dispatch<React.SetStateAction<Message>>;
	navigate: NavigateFunction;
}

async function authorizeUser(props: Props): Promise<void> {
	props.event.preventDefault();
	props.setLoading(true);
	try {
		const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(props.data)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
		const response: Message = await (await fetch("/users/authorize", options)).json();
		handleResponse({ setMessage: props.setMessage, response, navigate: props.navigate });
	} catch (error) {
		console.error("Request error", error);
	} finally {
		props.setLoading(false);
	}
}

export default authorizeUser;