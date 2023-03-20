import { Request, Response } from "express";
import Order from "../../models/order";
import OrderType from "../../types/order";

async function readOne(req: Request, res: Response) {
	try {
		const order: OrderType | null = await Order.findById(req.body.id);
		return res.status(200).json(order);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 02] Can't fetch data: ${error}` });
	}
}

export default readOne;