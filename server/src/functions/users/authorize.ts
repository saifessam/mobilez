import { Request, Response } from "express";
import User from "../../models/user";
import { comparePasswords, hashPassword, strongPassword } from "../../modules/passwords";
import { createToken } from "../../modules/tokens";
import UserType from "../../types/user";

async function authorize(req: Request, res: Response) {
	try {
		try {
			// Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `User ${emptyValue[0]} can't be empty` });

			// Checking if user is existed
			const existingUser: UserType | null = await User.findOne({ email: req.body.email.toString() });
			if (!existingUser) {
				// Checking if password is strong
				const isStrongPassword: boolean = strongPassword(req.body.password);
				if (!isStrongPassword) return res.status(403).json({ succeed: false, response: "Password is too weak provide a stronger one" });

				// Hashing password
				const hashedPassword: string = hashPassword(req.body.password);

				// Assigning first user as admin
				const users: number = await User.countDocuments();

				// Inserting user into the database
				const user = await User.create({ ...req.body, password: hashedPassword, admin: users === 0 });

				// Generating user authorization token
				const token: string = createToken(user._id.toString(), user.admin);

				// Setting auth_token cookie
				const options = { path: '/', maxAge: 1000 * 60 * 60 * 24 * 2, sameSite: false };
				return res.status(201).cookie('auth_token', token, options).json({ succeed: true, response: "User created successfully" });
			} else {
				// Validating given password
				const validPassword: boolean = comparePasswords(req.body.password, existingUser.password);
				if (!validPassword) return res.status(403).json({ succeed: false, response: "Wrong credentials" });

				// Generating user authorization token
				const token: string = createToken(existingUser._id!, existingUser.admin!);

				// Setting auth_token cookie
				const options = { path: '/', maxAge: 1000 * 60 * 60 * 24 * 2, sameSite: false };
				return res.status(202).cookie('auth_token', token, options).json({ succeed: true, response: "User authorized successfully" });
			}
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error authorizing user" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't process data: ${error}` });
	}
}

export default authorize;