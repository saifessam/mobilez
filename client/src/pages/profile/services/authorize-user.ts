import { SyntheticEvent } from "react";
import { NavigateFunction } from "react-router-dom";
import Message from "../../../types/message";
import UserType from "../../../types/user";
import handleResult from "../../../utilities/handle-result";

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
		const response = await fetch("/users/authorize", options);
		const result = await response.json();
		handleResult({ setMessage: props.setMessage, result, navigate: props.navigate });
	} catch (error) {
		console.error("Request error", error);
	} finally {
		props.setLoading(false);
	}
}

export default authorizeUser;