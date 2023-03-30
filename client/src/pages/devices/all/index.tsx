import { useEffect, useState } from 'react';
import DeviceCard from '../../../components/device-card';
import Loading from '../../../components/loading';
import Section from "../../../components/section";
import getDevices from '../../../services/get-devices';
import DeviceType from '../../../types/device';

function DevicesPage() {
	const [devices, setDevices] = useState<DeviceType[]>();

	useEffect(() => {
		const controller: AbortController = new AbortController();
		getDevices({ setDevices });
		return () => controller.abort();
	}, []);


	if (devices?.length === 0) {
		return <Loading message="Loading..." />;
	} else {
		return (
			<Section alignment="grid">
				{devices ? devices.map((device) => <DeviceCard data={device} key={device._id} />) : undefined}
			</Section>
		);
	}
}

export default DevicesPage;