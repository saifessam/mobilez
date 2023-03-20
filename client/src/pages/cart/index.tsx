import { useEffect, useState } from "react";
import OrderCard from "../../components/cards/order";
import Loading from "../../components/loading";
import Section from "../../components/section";
import useAuthToken from "../../hooks/useAuthToken";
import OrderData from "../../types/order-data";

function CartPage() {
	const [orders, setOrders] = useState<OrderData[]>([]);
	const authToken = useAuthToken();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getOrders(): Promise<void> {
			if (authToken?.id) {
				try {
					const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default", credentials: "include" };
					const response = await fetch(`/orders/cart/${authToken.id}`, options);
					await response.json().then((data) => setOrders(data));
				} catch (error) {
					console.error("Request error", error);
				}
			}
		}

		getOrders();

		return () => controller.abort();
	}, [authToken?.id]);

	if (orders?.length === 0) {
		return <Loading message="Loading..." />;
	} else {
		return (
			<Section alignment="row" addSpacing>
				<Section alignment="column" addSpacing>
					{orders.map((order) => order.items.map((item) => <OrderCard id={item.device} quntity={item.quantity} key={item.device} />))}
				</Section>
				<Section alignment="column" addSpacing title="Cart Checkout"></Section>
			</Section>
		);
	}
}

export default CartPage;