import { model, Schema } from 'mongoose';

const Order = model("Order", new Schema({
	receiver: { type: Schema.Types.ObjectId, ref: 'User' },
	items: [{
		device: { type: Schema.Types.ObjectId, ref: 'Device' },
		quantity: { type: Number, default: 1, required: true },
	}],
	address: { type: String },
	status: { type: String, required: true },
}, { timestamps: true, versionKey: false }));

export default Order;