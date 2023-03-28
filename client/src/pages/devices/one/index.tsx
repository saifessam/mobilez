import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from '../../../components/info';
import Loading from '../../../components/loading';
import DeviceType from '../../../types/device';

function DevicePage() {
	const { id } = useParams();
	const [device, setDevice] = useState<DeviceType>();

	useEffect(() => {
		const controller: AbortController = new AbortController();

		async function getDevice(): Promise<void> {
			try {
				const options: RequestInit = { method: "GET", headers: { "Content-Type": "application/json" }, cache: "default" };
				const response: DeviceType = await (await fetch(`/devices/${id}`, options)).json();
				setDevice(response);
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