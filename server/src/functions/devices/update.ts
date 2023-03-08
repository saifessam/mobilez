import { Request, Response } from "express";

async function update(req: Request, res: Response) {
	return res.status(201).send("dashboard/devices/update");
}

export default update;