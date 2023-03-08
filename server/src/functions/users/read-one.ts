import { Request, Response } from "express";
import User from "../../models/user";

async function readOne(req: Request, res: Response) {
	try {
		const user = await User.findById(req.params.id).exec();
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 02] Can't fetch data: ${error}` });
	}
}

export default readOne;