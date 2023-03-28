import multer, { diskStorage } from "multer";

const storage = diskStorage({
	destination: (request, file, callback) => {
		callback(null, 'src/uploads/');
	},
	filename: (request, file, callback) => {
		callback(null, `${Date.now()}.${file.originalname.split(".").slice(-1)}`);
	},
});

const upload = multer({ storage });

export default upload;