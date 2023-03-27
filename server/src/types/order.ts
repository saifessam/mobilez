declare type OrderType = {
	_id?: string;
	receiver: string;
	items: { device: string; quantity: number; price: number; _id?: string; }[];
	address?: string;
	status: string;
};

export default OrderType;