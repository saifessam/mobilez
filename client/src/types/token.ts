declare type Token = {
	id: string;
	admin: boolean;
	iat: Date;
	exp: Date;
};

export default Token;