import { SyntheticEvent, useState } from "react";
import DevicesJSON from "../../../assets/jsons/devices.json";
import Form from "../../../components/form";
import CarouselInput from "../../../components/inputs/carousel";
import FileInput from "../../../components/inputs/file";
import NumberInput from "../../../components/inputs/number";
import TextInput from "../../../components/inputs/text";
import Section from "../../../components/section";
import useWindowSize from "../../../hooks/useWindowSize";
import DeviceType from "../../../types/device";
import Message from "../../../types/message";

function DashboardDevicesPage() {
	const [data, setData] = useState<DeviceType>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const windowSize = useWindowSize();

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);

		const formData = new FormData();
		formData.append("type", data!.type);
		formData.append("condition", data!.condition);
		formData.append("brand", data!.brand);
		formData.append("model", data!.model);
		formData.append("color", data!.color);
		formData.append("image", data!.image);
		formData.append("ram", data!.ram);
		formData.append("rom", data!.rom);
		formData.append("price", data!.price.toString());
		formData.append("sales", data!.sales.toString());
		formData.append("stock", data!.stock.toString());

		try {
			const options: RequestInit = { method: "POST", body: formData, cache: "no-store", credentials: "include" };
			const response = await fetch("/devices/create", options);
			await response.json().then((data) => setMessage(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setLoading(false);
	}

	return (
		<Section alignment={windowSize.width! < 767 ? "column" : "row"} addSpacing>
			<Section alignment="column">Devices</Section>
			<Form onSubmit={handleSubmit} encType={"multipart/form-data"} title="Add new device" message={message} loading={loading}>
				<CarouselInput label="Type" name="type" options={DevicesJSON.types} setter={setData} />
				<CarouselInput label="Condition" name="condition" options={DevicesJSON.conditions} setter={setData} />
				<TextInput label="Brand" name="brand" placeholder="Apple, Google, Samsung, etc..." setter={setData} />
				<TextInput label="Model" name="model" placeholder="iPhone 12, Galaxy s21, Pixel 7 Pro, etc..." setter={setData} />
				<TextInput label="Color" name="color" placeholder="Black, White, Blue, etc..." setter={setData} />
				<FileInput label="Image" name="image" setter={setData} />
				<div className="form-body-row">
					<CarouselInput label="RAM" name="ram" options={DevicesJSON.ram} setter={setData} />
					<CarouselInput label="ROM" name="rom" options={DevicesJSON.rom} setter={setData} />
				</div>
				<NumberInput label="Price" name="price" setter={setData} isCurrency />
				<div className="form-body-row">
					<NumberInput label="Sales" name="sales" setter={setData} />
					<NumberInput label="Stock" name="stock" setter={setData} />
				</div>
			</Form>
		</Section>
	);
}

export default DashboardDevicesPage;