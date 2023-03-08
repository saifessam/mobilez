import { Request, Response } from "express";

async function update(req: Request, res: Response) {
	return res.status(201).send("announcements/update");
}

export default update;