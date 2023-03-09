import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Loading from '../../../components/loading';
import DeviceData from '../../../types/device-data';
import Info from '../../../components/info';

function DevicePage() {
	const { id } = useParams();
	const [device, setDevice] = useState<DeviceData>();
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		async function getDevice(): Promise<void> {
			setLoading(true);
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response = await fetch(`/devices/${id}`, options);
				await response.json().then((data: DeviceData) => setDevice(data));
			} catch (error) {
				console.error("Request error", error);
			}
			setLoading(false);
		}

		getDevice();
	}, [id]);

	if (!device) {
		return <Loading message="Loading..." />;
	} else {
		return <Info data={device} />;
	}
}

export default DevicePage;