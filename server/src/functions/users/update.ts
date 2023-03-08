import { Request, Response } from "express";

async function update(req: Request, res: Response) {
	return res.status(201).json({ succeed: true, response: "users/update" });
}

export default update;