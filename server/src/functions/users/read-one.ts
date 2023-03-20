import { Request, Response } from "express";
import User from "../../models/user";
import UserType from "../../types/user";

async function readOne(req: Request, res: Response) {
	try {
		const user: UserType | null = await User.findById(req.params.id);
		return res.status(200).json(user);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 02] Can't fetch data: ${error}` });
	}
}

export default readOne;