import Message from "../types/message";
import OrderType from "../types/order";

interface Props {
	setLabel: React.Dispatch<React.SetStateAction<Message>>;
	orderData: OrderType;
}

async function addToCart(props: Props): Promise<void> {
	props.setLabel((prev) => ({ ...prev, response: "Loading" }));
	try {
		const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(props.orderData)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
		const response: Message = await (await fetch("/orders/create", options)).json();
		props.setLabel(response);
	} catch (error) {
		console.error("Request error", error);
	} finally {
		setTimeout(() => props.setLabel({ succeed: null, response: "Add to cart" }), 2000);
	}
}

export default addToCart;