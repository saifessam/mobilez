import { Request, Response } from "express";
import User from "../../models/user";

async function update(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `User ${emptyValue[0]} can't be empty` });

			// 2. Updating user data
			await User.findByIdAndUpdate(req.body._id, req.body);
			return res.status(201).json({ succeed: true, response: "User updated successfully" });
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error updating user" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't update data: ${error}` });
	}
}

export default update;