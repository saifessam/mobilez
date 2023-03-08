import { Request, Response } from "express";

async function remove(req: Request, res: Response) {
	return res.status(201).json({ succeed: true, response: "users/remove" });
}

export default remove;