declare type OrderData = {
	_id?: string;
	receiver: string;
	items: [{ device: string; quantity: number; }];
	status: "SAVED" | "PENDDING" | "SHIPPED";
};

export default OrderData;