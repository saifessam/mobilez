import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Info from '../components/info';
import Loading from '../components/loading';
import getDevice from '../services/get-device';
import DeviceType from '../types/device';

function DevicePage() {
	const { id } = useParams();
	const [device, setDevice] = useState<DeviceType>();

	useEffect(() => {
		const controller: AbortController = new AbortController();
		if (id) getDevice({ id, setDevice });
		return () => controller.abort();
	}, [id]);


	if (!device) {
		return <Loading message="Loading..." />;
	} else {
		return <Info data={device} />;
	}
}

export default DevicePage;