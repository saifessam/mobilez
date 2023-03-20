declare type DeviceType = {
	_id?: string;
	type: string;
	condition: string;
	brand: string;
	model: string;
	color: string;
	image: string;
	ram: string;
	rom: string;
	price: number;
	sales: number;
	stock: number;
};

export default DeviceType;