import { model, Schema } from 'mongoose';

const schema = new Schema({
	title: { type: String, required: true },
	content: { type: String, required: true },
	image: { type: String, required: true },
}, { timestamps: true, versionKey: false });

export default model("Announcement", schema);