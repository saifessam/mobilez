import UserType from "../types/user";

interface Props {
	id: string;
	setData: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}

async function getUser(props: Props) {
	try {
		const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
		const response: UserType = await (await fetch(`/users/${props.id}`, options)).json();
		props.setData(response);
	} catch (error) {
		console.error("Request error", error);
	}
}

export default getUser;