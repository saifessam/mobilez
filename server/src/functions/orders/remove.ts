import { Request, Response } from "express";

async function remove(req: Request, res: Response) {
	return res.status(201).send("orders/remove");
}

export default remove;