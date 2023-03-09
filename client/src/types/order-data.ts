declare type OrderType = {
	receiver: string | undefined;
	items: [{ device: string | undefined; quantity: number; }];
	status: "SAVED" | "PENDDING" | "SHIPPED";
};

export default OrderType;