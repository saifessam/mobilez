import { Request, Response } from "express";
import Announcement from "../../models/announcement";

async function readAll(req: Request, res: Response) {
	try {
		const announcements = await Announcement.find();
		return res.status(200).json(announcements);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't fetch data: ${error}` });
	}
}

export default readAll;