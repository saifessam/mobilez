import { SyntheticEvent } from "react";
import DeviceType from "../types/device";
import Message from "../types/message";

interface Props {
	event: SyntheticEvent;
	data: DeviceType | undefined;
	setLoading: React.Dispatch<React.SetStateAction<boolean>>;
	setMessage: React.Dispatch<React.SetStateAction<Message>>;
}

async function addDevice(props: Props): Promise<void> {
	props.event.preventDefault();
	props.setLoading(true);

	const formData = new FormData();
	formData.append("type", props.data!.type);
	formData.append("condition", props.data!.condition);
	formData.append("brand", props.data!.brand);
	formData.append("model", props.data!.model);
	formData.append("color", props.data!.color);
	formData.append("image", props.data!.image);
	formData.append("ram", props.data!.ram);
	formData.append("rom", props.data!.rom);
	formData.append("price", props.data!.price.toString());
	formData.append("sales", props.data!.sales.toString());
	formData.append("stock", props.data!.stock.toString());

	try {
		const options: RequestInit = { method: "POST", body: formData, cache: "no-store", credentials: "include" };
		const response = await fetch("/devices/create", options);
		await response.json().then((data) => props.setMessage(data));
	} catch (error) {
		console.error("Request error", error);
	} finally {
		props.setLoading(false);
	}
}

export default addDevice;