import { SyntheticEvent } from "react";
import Message from "../types/message";
import UserType from "../types/user";

interface Props {
	event: SyntheticEvent;
	data: UserType | undefined;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setMessage: React.Dispatch<React.SetStateAction<Message>>;
}

async function updateUser(props: Props): Promise<void> {
	props.event.preventDefault();
	props.setLoading(true);
	try {
		const options: RequestInit = { method: "PUT", body: new Blob([JSON.stringify(props.data)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
		const response: Message = await (await fetch("/users/update", options)).json();
		props.setMessage(response);
	} catch (error) {
		console.error("Request error", error);
	} finally {
		props.setLoading(false);
	}
}

export default updateUser;