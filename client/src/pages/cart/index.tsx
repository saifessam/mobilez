import { useEffect, useState } from "react";
import OrderCard from "../../components/cards/order";
import Checkout from "../../components/checkout";
import Loading from "../../components/loading";
import Message from "../../components/message";
import Section from "../../components/section";
import useAuthToken from "../../hooks/useAuthToken";
import OrderType from "../../types/order";

function CartPage() {
	const [loading, setLoading] = useState<boolean>(true);
	const [items, setItems] = useState<OrderType["items"]>([]);
	const authToken = useAuthToken();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getOrders(id: string): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default", credentials: "include" };
				const response: OrderType = await (await fetch(`/orders/cart/${id}`, options)).json();
				setItems(response.items);
			} catch (error) {
				console.error("Request error", error);
			} finally {
				setLoading(false);
			}
		}

		if (authToken) getOrders(authToken.id);
		return () => controller.abort();
	}, [authToken]);

	function getTotalCount(): number {
		let total: number = 0;

		items.map((item) => total += item.quantity);

		return total;
	}

	function getPrice(): number {
		let total: number = 0;

		items.map((item) => total += item.price);

		return total;
	}

	if (loading) {
		return <Loading message="Loading..." />;
	} else {
		if (items.length === 0) {
			return (
				<Section alignment="main" centerContent>
					<Message message="Empty Cart" decription="Your cart is empty. add any device to be shown here" redirect="/" />
				</Section>
			);
		} else {
			console.log("getTotalCount ==>", getTotalCount());

			return (
				<Section alignment="row" addSpacing>
					<Section alignment="column" addSpacing>
						{items.map((order) => <OrderCard id={order.device} quntity={order.quantity} price={order.price} key={order._id} />)}
					</Section>
					<Checkout count={items.length} totalCount={getTotalCount()} price={getPrice()} />
				</Section>
			);
		}
	}
}

export default CartPage;