import { Request, Response } from "express";
import Announcement from "../../models/announcement";

async function create(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `Announcement ${emptyValue[0]} can't be empty` });

			// 2. Inserting announcement into the database
			await Announcement.create(req.body);
			return res.status(201).json({ succeed: true, response: "Announcement is created successfully" });
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error creating announcement" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't insert data: ${error}` });
	}
}

export default create;