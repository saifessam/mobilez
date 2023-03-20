import { useEffect, useState } from "react";
import OrderCard from "../../components/cards/order";
import Checkout from "../../components/checkout";
import Loading from "../../components/loading";
import Message from "../../components/message";
import Section from "../../components/section";
import useAuthToken from "../../hooks/useAuthToken";
import OrderData from "../../types/order-data";

function CartPage() {
	const [loading, setLoading] = useState<boolean>(true);
	const [orders, setOrders] = useState<OrderData["items"]>([]);
	const authToken = useAuthToken();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getOrders(): Promise<void> {
			if (authToken?.id) {
				try {
					const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default", credentials: "include" };
					const response = await fetch(`/orders/cart/${authToken.id}`, options);
					await response.json().then((data) => setOrders(data[0].items));
				} catch (error) {
					console.error("Request error", error);
				}
				setLoading(false);
			}
		}

		getOrders();

		return () => controller.abort();
	}, [authToken?.id]);

	if (loading) {
		return <Loading message="Loading..." />;
	} else {
		if (orders.length === 0) {
			return (
				<Section alignment="main" centerContent>
					<Message message="Empty Cart" decription="Your cart is empty. add any device to be shown here" redirect="/" />
				</Section>
			);
		} else {
			return (
				<Section alignment="row" addSpacing>
					<Section alignment="grid" addSpacing>
						{orders.map((order) => <OrderCard id={order.device} quntity={order.quantity} key={order._id} />)}
					</Section>
					<Checkout />
				</Section>
			);
		}
	}
}

export default CartPage;