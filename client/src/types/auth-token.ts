declare type AuthToken = {
	id: string;
	role: "ADMIN" | "CONSUMER";
	iat: Date;
	exp: Date;
};

export default AuthToken;