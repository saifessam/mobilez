import { Request, Response } from "express";
import User from "../../models/user";
import { comparePasswords } from "../../modules/passwords";
import { createToken } from "../../modules/tokens";

async function authorize(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `User ${emptyValue[0]} can't be empty` });

			// 2. Checking if user is existed
			const existingUser = await User.findOne({ email: req.body.email.toString() });
			if (!existingUser) return res.status(403).json({ succeed: false, response: "Wrong credentials" });

			// 3. Validating given password
			const validPassword: boolean = comparePasswords(req.body.password, existingUser.password);
			if (!validPassword) return res.status(403).json({ succeed: false, response: "Wrong credentials" });

			// 4. Generating user authorization token
			const token: string = createToken(existingUser._id.toString(), existingUser.role);

			// 5. Setting auth_token cookie
			return res.status(202).cookie('auth_token', token, { path: '/', maxAge: 1000 * 60 * 60 * 24 * 2, sameSite: false }).json({ succeed: true, response: "User authorized successfully" });
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error authorizing user" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't process data: ${error}` });
	}
}

export default authorize;