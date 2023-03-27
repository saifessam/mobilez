import { model, Schema } from 'mongoose';

const schema = new Schema({
	email: { type: String, required: true, unique: true, lowercase: true },
	password: { type: String, required: true },
	admin: { type: Boolean, required: true },
	name: { type: String },
	phone: { type: String, unique: true, sparse: true },
	address: { type: [String], default: undefined },
}, { timestamps: true, versionKey: false });

export default model("User", schema);