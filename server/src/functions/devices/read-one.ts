import { Request, Response } from "express";
import Device from "../../models/device";

async function readOne(req: Request, res: Response) {
	try {
		const device = await Device.findById(req.params.id);
		return res.status(200).json(device);
	} catch (error) {
		return res.status(500).send(`[SERVER ERROR 02] Can't fetch data: ${error}`);
	}
}

export default readOne;