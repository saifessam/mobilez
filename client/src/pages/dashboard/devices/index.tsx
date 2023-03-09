import { SyntheticEvent, useState } from "react";
import DeviceData from "../../../types/device-data";
import Message from "../../../types/message";
import Form from "./../../../components/form";
import CarouselInput from "./../../../components/inputs/carousel";
import FileInput from "./../../../components/inputs/file";
import NumberInput from "./../../../components/inputs/number";
import TextInput from "./../../../components/inputs/text";
import Navigator from "./../../../components/navigator";
import Section from "./../../../components/section";
import { DevicesRAM, DevicesROM } from "./../../../data/devices-capacity";
import DevicesConditions from "./../../../data/devices-conditions";
import DevicesTypes from "./../../../data/devices-types";

function DashboardDevicesPage() {
	const [data, setData] = useState<DeviceData>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);
		console.log(data);
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
			<Navigator />
			<Section alignment="column" addSpacing></Section>
			<Form onSubmit={handleSubmit} encType={"multipart/form-data"} title="Add new device" message={message} loading={loading}>
				<CarouselInput label="Type" name="type" options={DevicesTypes} setter={setData} />
				<CarouselInput label="Condition" name="condition" options={DevicesConditions} setter={setData} />
				<TextInput label="Brand" name="brand" placeholder="Apple, Google, Samsung, etc..." setter={setData} />
				<TextInput label="Model" name="model" placeholder="iPhone 12, Galaxy s21, Pixel 7 Pro, etc..." setter={setData} />
				<TextInput label="Color" name="color" placeholder="Black, White, Blue, etc..." setter={setData} />
				<FileInput label="Image" name="image" setter={setData} />
				<div className="form-body-row">
					<CarouselInput label="RAM" name="ram" options={DevicesRAM} setter={setData} />
					<CarouselInput label="ROM" name="rom" options={DevicesROM} setter={setData} />
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