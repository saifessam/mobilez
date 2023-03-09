import { Chart as ChartJS, registerables } from "chart.js";
import { Line } from "react-chartjs-2";
import Selector from './../../../components/selector';
import DevicesTypes from './../../../data/devices-types';
import './style.css';

ChartJS.register(...registerables);

interface Props {
	data: any;
}

function AreaChart(props: Props) {
	return (
		<div className='area-chart'>
			<div className="area-chart-header">
				<span>Best Selling Devices</span>
				<Selector options={DevicesTypes} selected={DevicesTypes[0]} setter={() => { }} />
			</div>
			<div className="area-chart-body">
				<Line data={props.data} options={{ plugins: { legend: { display: false } } }} />
			</div>
		</div>
	);
}

export default AreaChart;