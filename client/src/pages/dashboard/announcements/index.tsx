import { useState, SyntheticEvent } from "react";
import Form from "../../../components/form";
import FileInput from "../../../components/inputs/file";
import ParagraphInput from "../../../components/inputs/paragraph";
import TextInput from "../../../components/inputs/text";
import Navigator from "../../../components/navigator";
import Section from "../../../components/section";
import AnnouncementData from "../../../types/announcements-data";
import Message from "../../../types/message";

function DashboardAnnouncementsPage() {
	const [data, setData] = useState<AnnouncementData>();
	const [loading, setLoading] = useState<boolean>(false);
	const [message, setMessage] = useState<Message>({ succeed: null, response: null });

	async function handleSubmit(e: SyntheticEvent): Promise<void> {
		e.preventDefault();
		setLoading(true);
		try {
			const options: RequestInit = { method: "POST", body: new Blob([JSON.stringify(data)], { type: 'application/json' }), cache: "no-store" };
			const response = await fetch("/announcements/create", options);
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
			<Section alignment="column" fitContent>
				<Form onSubmit={handleSubmit} title="Add new Annoncement" message={message} loading={loading}>
					<TextInput name="title" label="Title" placeholder="New Sale, Buy One Get One, etc..." setter={setData} />
					<ParagraphInput name="content" label="Content" placeholder="Describe your announcement" setter={setData} />
					<FileInput name="image" label="Image" setter={setData} />
				</Form>
			</Section>
		</Section>
	);
}

export default DashboardAnnouncementsPage;