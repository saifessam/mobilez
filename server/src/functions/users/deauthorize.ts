import { Request, Response } from "express";

async function deauthorize(req: Request, res: Response) {
	res.status(200).cookie("auth_token", "", { maxAge: 1 }).json({ succeed: true, response: "User deauthorized successfully" });
}

export default deauthorize;