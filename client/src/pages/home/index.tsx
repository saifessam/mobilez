import { useEffect, useState } from "react";
import DeviceCard from "../../components/cards/device";
import Loading from "../../components/loading";
import DeviceData from "../../types/device-data";
import Section from "./../../components/section";

function HomePage() {
	const [devices, setDevices] = useState<DeviceData[]>();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getDevices(): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response = await fetch("/devices", options);
				await response.json().then((data: DeviceData[]) => setDevices(data));
			} catch (error) {
				console.error("Request error", error);
			}
		}

		getDevices();

		return () => controller.abort();
	}, []);

	if (!devices) {
		return <Loading message="Loading..." />;
	} else {
		return <Section alignment="grid">{devices.map((device) => <DeviceCard data={device} key={device._id} />)}</Section>;
	}
}

export default HomePage;