declare type OrderData = {
	_id?: string;
	receiver: string;
	items: { device: string; quantity: number; _id?: string; }[];
	status: "SAVED" | "PENDDING" | "SHIPPED";
};

export default OrderData;