import { model, Schema } from 'mongoose';

const schmea = new Schema({
	type: { type: String, required: true },
	brand: { type: String, required: true },
	model: { type: String, required: true },
	image: { type: String, required: true },
	color: { type: String, required: true },
	price: { type: Number, required: true },
	rom: { type: String, required: true },
	ram: { type: String, required: true },
	condition: { type: String, required: true },
	sales: { type: Number, required: true },
	stock: { type: Number, required: true },
}, { timestamps: true, versionKey: false });

export default model("Device", schmea);