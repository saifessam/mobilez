import { SyntheticEvent, useState } from "react";
import DevicesJSON from "../../../../assets/jsons/devices.json";
import Form from "../../../../components/form";
import CarouselInput from "../../../../components/inputs/carousel";
import FileInput from "../../../../components/inputs/file";
import NumberInput from "../../../../components/inputs/number";
import TextInput from "../../../../components/inputs/text";
import Section from "../../../../components/section";
import DeviceData from "../../../../types/device-data";
import Message from "../../../../types/message";

function DashboardDevicesPage() {
	const [data, setData] = useState<DeviceData>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(data)], { type: 'application/json' }), cache: "no-store", credentials: "include" };
			const response = await fetch("/devices/create", options);
			await response.json().then((data) => setMessage(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setLoading(false);
	}

	return (
		<Section alignment="row" addSpacing>
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