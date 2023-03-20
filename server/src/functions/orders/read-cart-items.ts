import { Request, Response } from "express";
import Order from "../../models/order";

async function readCartItems(req: Request, res: Response) {
	try {
		const orders = await Order.find({ receiver: req.params.id, status: "SAVED" });
		return res.status(200).json(orders);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't fetch data: ${error}` });
	}
}

export default readCartItems;