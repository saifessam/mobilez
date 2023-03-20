import { Request, Response } from "express";
import order from "../../models/order";

async function remove(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `Order ${emptyValue[0]} can't be empty` });

			// 2. Deleting device from order.items array
			const filter = { receiver: req.body.receiver };
			const update = { $pull: { items: { device: req.body.id } } };
			await order.updateOne(filter, update);
			return res.status(201).json({ succeed: true, response: "Device is removed successfully" });
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error removing device" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't remove device: ${error}` });
	}
}

export default remove;