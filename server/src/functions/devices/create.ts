import { Request, Response } from "express";
import Device from "../../models/device";

async function create(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `Device ${emptyValue[0]} can't be empty` });

			// 2. Inserting device into the database
			await Device.create({ ...req.body, image: req.file?.filename });
			return res.status(201).json({ succeed: true, response: "Device is created successfully" });
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error creating device" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't insert data: ${error}` });
	}
}

export default create;