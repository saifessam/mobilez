import { Request, Response } from "express";
import User from "../../models/user";
import { hashPassword, strongPassword } from "../../modules/passwords";
import { createToken } from "../../modules/tokens";

async function create(req: Request, res: Response) {
	try {
		try {
			// 1. Checking req.body data is valid
			const emptyValue = Object.entries(req.body).find((entry) => entry[1] === null);
			if (emptyValue) return res.status(403).json({ succeed: false, response: `User ${emptyValue[0]} can't be empty` });

			// 2. Checking for an existing e-mail
			const existingEmail = await User.findOne({ email: req.body.email.toString() });
			if (existingEmail) return res.status(403).json({ succeed: false, response: "A user is already registered with the provided e-mail" });

			// 3. Checking for an existing phone number
			const existingPhone = await User.findOne({ phone: req.body.phone.toString() });
			if (existingPhone) return res.status(403).json({ succeed: false, response: "A user is already registered with the provided phone number" });

			// 4. Checking if password is strong
			const isStrongPassword: boolean = strongPassword(req.body.password);
			if (!isStrongPassword) return res.status(403).json({ succeed: false, response: "Password is too weak provide a stronger one" });

			// 5. Hashing password
			const hashedPassword: string = hashPassword(req.body.password);

			// 6. Assigning first user as admin
			const firstUser: number = await User.countDocuments();


			// 7. Inserting user into the database
			const user = await User.create({ ...req.body, password: hashedPassword, role: firstUser === 0 ? "ADMIN" : "CONSUMER" });

			// 8. Generating user authorization token
			const token: string = createToken(user._id.toString(), user.role);

			// 9. Setting auth_token cookie
			return res.status(201).cookie('auth_token', token, { path: '/', maxAge: 1000 * 60 * 60 * 24 * 2, sameSite: false }).json({ succeed: true, response: "User created successfully" });
		} catch (error) {
			return res.status(400).json({ succeed: false, response: "Error creating user" });
		}
	} catch (error) {
		return res.status(500).json({ succeed: false, response: `[SERVER ERROR 01] Can't insert data: ${error}` });
	}
}

export default create;