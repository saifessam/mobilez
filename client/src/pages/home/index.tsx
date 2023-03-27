import { useEffect, useState } from "react";
import DeviceCard from "../../components/cards/device";
import Header from "../../components/header";
import Loading from "../../components/loading";
import DeviceType from "../../types/device";
import Section from "./../../components/section";

function HomePage() {
	const [devices, setDevices] = useState<DeviceType[]>();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getDevices(): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response = await fetch("/devices/limited/8", options);
				await response.json().then((data: DeviceType[]) => setDevices(data));
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
		return (
			<Section alignment="main" addSpacing>
				<Header />
				<Section alignment="grid">
					{devices.map((device: DeviceType) => <DeviceCard data={device} key={device._id} />)}
				</Section>
			</Section>
		);
	}
}

export default HomePage;