import { useEffect, useState } from "react";
import Annoncement from "../../components/announcement";
import DeviceCard from "../../components/cards/device";
import Carousel from "../../components/carousel";
import Loading from "../../components/loading";
import AnnouncementData from "../../types/announcements-data";
import DeviceData from "../../types/device-data";
import Section from "./../../components/section";

function HomePage() {
	const [loading, setLoading] = useState<boolean>(true);
	const [announcements, setAnnouncements] = useState<AnnouncementData[]>();
	const [devices, setDevices] = useState<DeviceData[]>();

	useEffect(() => {
		async function getData(): Promise<void> {
			await getAnnouncements();
			await getDevices();
		}

		getData();

		return () => setLoading(false);
	}, []);


	async function getAnnouncements(): Promise<void> {
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response = await fetch("/announcements", options);
			await response.json().then((data: AnnouncementData[]) => setAnnouncements(data));
		} catch (error) {
			console.error("Request error", error);
		}
	}

	async function getDevices(): Promise<void> {
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response = await fetch("/devices", options);
			await response.json().then((data: DeviceData[]) => setDevices(data));
		} catch (error) {
			console.error("Request error", error);
		}
	}

	if (loading) {
		return <Loading message="Loading..." />;
	} else {
		return (
			<Section alignment="main" addSpacing>
				{announcements ? <Carousel slides={announcements.map((annoncement) => <Annoncement data={annoncement} key={annoncement._id} />)} /> : undefined}
				{devices ? <Section alignment="grid" title="Featured Devices">{devices.map((device) => <DeviceCard data={device} key={device._id} />)}</Section> : undefined}
			</Section>
		);
	}
}

export default HomePage;