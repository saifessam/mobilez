import { useState, useEffect } from 'react';
import Loading from '../../components/loading';
import AnnouncementData from '../../types/announcements-data';
import Section from "../../components/section";
import Annoncement from '../../components/announcement';

function AnnouncementsPage() {
	const [announcements, setAnnouncements] = useState<AnnouncementData[]>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		getAnnouncements();
	}, []);

	async function getAnnouncements(): Promise<void> {
		setLoading(true);
		try {
			const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
			const response = await fetch("/announcements", options);
			await response.json().then((data) => setAnnouncements(data));
		} catch (error) {
			console.error("Request error", error);
		}
		setLoading(false);
	}

	if (loading) return <Loading message="Loading..." />;

	return (
		<Section alignment="column" addSpacing>
			{announcements ? announcements.map((device) => <Annoncement data={device} key={device._id} />) : undefined}
		</Section>
	);
}

export default AnnouncementsPage;