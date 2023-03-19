import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from '../../../components/info';
import Loading from '../../../components/loading';
import DeviceData from '../../../types/device-data';

function DevicePage() {
	const { id } = useParams();
	const [device, setDevice] = useState<DeviceData>();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getDevice(): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response = await fetch(`/devices/${id}`, options);
				await response.json().then((data: DeviceData) => setDevice(data));
			} catch (error) {
				console.error("Request error", error);
			}
		}

		getDevice();

		return () => controller.abort();
	}, [id]);


	if (!device) {
		return <Loading message="Loading..." />;
	} else {
		return <Info data={device} />;
	}
}

export default DevicePage;