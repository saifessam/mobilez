import DeviceType from "../types/device";

interface Props {
	id: string;
	setDevice: React.Dispatch<React.SetStateAction<DeviceType | undefined>>;
}

async function getDevice(props: Props): Promise<void> {
	try {
		const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
		const response: DeviceType = await (await fetch(`/devices/${props.id}`, options)).json();
		props.setDevice(response);
	} catch (error) {
		console.error("Request error", error);
	}
}

export default getDevice;