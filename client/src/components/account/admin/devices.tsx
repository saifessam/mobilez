import { SyntheticEvent, useState } from "react";
import DevicesJSON from "../../../assets/jsons/devices.json";
import Form from "../../../components/form";
import CarouselInput from "../../../components/inputs/carousel";
import FileInput from "../../../components/inputs/file";
import NumberInput from "../../../components/inputs/number";
import TextInput from "../../../components/inputs/text";
import Section from "../../../components/section";
import useWindowSize from "../../../hooks/window-size";
import addDevice from "../../../services/add-device";
import DeviceType from "../../../types/device";
import Message from "../../../types/message";

function AdminDevices() {
	const [data, setData] = useState<DeviceType>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });
	const windowSize = useWindowSize();

	return (
		<Section alignment={windowSize.width! < 767 ? "column" : "row"} addSpacing>
			<Section alignment="column">Devices</Section>
			<Form onSubmit={(event: SyntheticEvent) => addDevice({ event, data, setLoading, setMessage })} encType={"multipart/form-data"} title="Add new device" message={message} loading={loading}>
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

export default AdminDevices;