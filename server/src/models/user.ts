import { model, Schema } from 'mongoose';

const schema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true, unique: true, lowercase: true },
	phone: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	role: { type: String, default: "CONSUMER", required: true },
}, { timestamps: true, versionKey: false });

export default model("User", schema);