import DeviceType from "../types/device";

interface Props {
	limit?: number;
	setDevices: React.Dispatch<React.SetStateAction<DeviceType[] | undefined>>;
}

async function getDevices(props: Props): Promise<void> {
	try {
		const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
		const response: DeviceType[] = await (await fetch(props.limit ? `/devices/limited/${props.limit}` : "/devices", options)).json();
		props.setDevices(response);
	} catch (error) {
		console.error("Request error", error);
	}
}

export default getDevices;