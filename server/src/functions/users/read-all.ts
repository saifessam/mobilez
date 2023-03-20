import { Request, Response } from "express";
import User from "../../models/user";
import UserType from "../../types/user";

async function readAll(req: Request, res: Response) {
	try {
		const users: UserType[] = await User.find();
		return res.status(200).json(users);
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't fetch data: ${error}` });
	}
}

export default readAll;