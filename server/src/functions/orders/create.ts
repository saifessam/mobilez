import { Request, Response } from "express";
import Order from "../../models/order";

async function create(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `Order ${emptyValue[0]} can't be empty` });

			// 2. Inserting order into the database
			await Order.create(req.body);
			return res.status(201).json({ succeed: true, response: "Order is created successfully" });
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error creating order" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't insert data: ${error}` });
	}
}

export default create;