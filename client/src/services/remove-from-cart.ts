import Message from "../types/message";
import Token from "../types/token";

interface Props {
	setRemoving: React.Dispatch<React.SetStateAction<boolean>>;
	id: string;
	authToken: Token | undefined;
}

async function removeFromCart(props: Props): Promise<void> {
	props.setRemoving(true);
	setTimeout(async () => {
		try {
			const options: RequestInit = { method: "DELETE", headers: { "Content-Type": "application/json" }, body: new Blob([JSON.stringify({ id: props.id, receiver: props.authToken!.id })]), cache: "default", credentials: "include" };
			const response: Message = await (await fetch("/orders/remove", options)).json();
			if (response.succeed) window.location.reload();
		} catch (error) {
			console.error("Request error", error);
		}
	}, 300);
}

export default removeFromCart;