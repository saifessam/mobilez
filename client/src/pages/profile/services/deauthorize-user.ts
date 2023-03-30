import { NavigateFunction } from "react-router-dom";

async function deauthorizeUser(navigate: NavigateFunction): Promise<void> {
	try {
		await fetch("http://localhost:4000/users/deauthorize", { method: "GET", cache: "no-store", credentials: "include" });
		navigate('/', { replace: true });
		window.location.reload();
	} catch (error) {
		console.error("Request error", error);
	}
}

export default deauthorizeUser;