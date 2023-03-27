declare type UserType = {
	_id?: string;
	email: string;
	password: string;
	admin?: boolean;
	name?: string;
	phone?: string;
	address?: string[];
	createdAt: Date;
	updatedAt: Date;
};

export default UserType;