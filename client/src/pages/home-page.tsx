import { useEffect, useState } from "react";
import DeviceCard from "../components/cards/device";
import Header from "../components/header";
import Loading from "../components/loading";
import Section from "../components/section";
import getDevices from "../services/get-devices";
import DeviceType from "../types/device";

function HomePage() {
	const [devices, setDevices] = useState<DeviceType[]>();

	useEffect(() => {
		const controller: AbortController = new AbortController();
		getDevices({ limit: 8, setDevices });
		return () => controller.abort();
	}, []);

	if (!devices) {
		return <Loading message="Loading..." />;
	} else {
		return (
			<Section alignment="main" addSpacing>
				<Header />

				<Section alignment="grid" title={{ label: "Featured Devices", link: { label: "Explore more devices →", path: "/devices" } }}>
					{devices.map((device: DeviceType) => <DeviceCard data={device} key={device._id} />)}
				</Section>
			</Section>
		);
	}
}

export default HomePage;