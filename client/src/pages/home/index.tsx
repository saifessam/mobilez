import { useEffect, useState } from "react";
import Annoncement from "../../components/announcement";
import Card from "../../components/card";
import Carousel from "../../components/carousel";
import AnnouncementData from "../../types/announcements-data";
import DeviceData from "../../types/device-data";
import Section, { SectionHeader } from "./../../components/section";

function HomePage() {
	const [announcements, setAnnouncements] = useState<AnnouncementData[]>();
	const [devices, setDevices] = useState<DeviceData[]>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		getAnnouncements();
		getDevices();
	}, []);

	async function getAnnouncements(): Promise<void> {
		setLoading(true);
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response = await fetch("/announcements", options);
			await response.json().then((data: AnnouncementData[]) => setAnnouncements(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setLoading(false);
	}

	async function getDevices(): Promise<void> {
		setLoading(true);
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response = await fetch("/devices", options);
			await response.json().then((data: DeviceData[]) => setDevices(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setLoading(false);
	}

	return (
		<Section alignment="main" addSpacing>
			{loading ? "Loading Announcements..." : announcements ? <Carousel slides={announcements.map((annoncement) => <Annoncement data={annoncement} key={annoncement._id} />)} /> : undefined}
			<Section alignment="grid" title="Featured Devices">
				{loading ? "Loading Devices..." : devices ? devices.map((device) => <Card data={device} key={device._id} />) : undefined}
			</Section>
		</Section>
	);
}

export default HomePage;