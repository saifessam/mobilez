import { Request, Response } from "express";
import Order from "../../models/order";
import OrderType from "../../types/order";

async function create(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `Order ${emptyValue[0]} can't be empty` });

			// 2. Checking for an exsiting order
			const existingOrder: OrderType | null = await Order.findOne({ receiver: req.body.receiver });

			if (existingOrder) {
				// 3. Checking for an exsiting device in the existing order
				const existingDevice = existingOrder.items.some((item) => item.device.toString() === req.body.items[0].device);
				const filter = { receiver: req.body.receiver };
				// 4. If the device is already existed (increment quntity by 1) if not (add new device to items array)
				const update = existingDevice ? { $inc: { 'items.$[elem].quantity': 1 } } : { $addToSet: { items: req.body.items[0] } };
				const options = { arrayFilters: [{ 'elem.device': req.body.items[0].device }] };
				// 5. Executing update function
				await Order.updateOne(filter, update, options);
				return res.status(201).json({ succeed: true, response: "Device is added successfully" });
			} else {
				// 6. Inserting new order document into the database
				await Order.create(req.body);
				return res.status(201).json({ succeed: true, response: "Device is added successfully" });
			}
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error adding device" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't insert device: ${error}` });
	}
}

export default create;