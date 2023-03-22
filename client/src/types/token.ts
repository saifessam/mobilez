declare type Token = {
	id: string;
	role: "ADMIN" | "CONSUMER";
	iat: Date;
	exp: Date;
};

export default Token;