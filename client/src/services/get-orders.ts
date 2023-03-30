import OrderType from "../types/order";

interface Props {
	id: string;
	setter: React.Dispatch<React.SetStateAction<{
		device: string;
		quantity: number;
		price: number;
		_id?: string | undefined;
	}[]>>;
	loading: React.Dispatch<React.SetStateAction<boolean>>;
}

async function getOrders(props: Props): Promise<void> {
	try {
		const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default", credentials: "include" };
		const response: OrderType = await (await fetch(`/orders/cart/${props.id}`, options)).json();
		props.setter(response.items);
	} catch (error) {
		console.error("Request error", error);
	} finally {
		props.loading(false);
	}
}

export default getOrders;