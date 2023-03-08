import { Chart as ChartJS, registerables } from "chart.js";
import { Bar } from "react-chartjs-2";
import './style.css';

ChartJS.register(...registerables);

interface Props {
	data: any;
}

function BarsChart(props: Props) {
	return (
		<div className='bars-chart'>
			<div className="bars-chart-header">
				<span>Most Selling Brands</span>
			</div>
			<div className="bars-chart-body">
				<Bar data={props.data} options={{ plugins: { legend: { display: false } } }} />
			</div>
		</div>
	);
}

export default BarsChart;