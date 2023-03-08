import { Request, Response } from "express";
import Announcement from "../../models/announcement";

async function readOne(req: Request, res: Response) {
	try {
		const announcement = await Announcement.findById(req.body.id).exec();
		return res.status(200).json(announcement);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 02] Can't fetch data: ${error}` });
	}
}

export default readOne;