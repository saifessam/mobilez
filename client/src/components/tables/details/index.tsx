import { useId } from 'react';
import './style.css';

interface Props {
	title: string;
	amount: string;
	data: { title: string, value: string; }[];
}

function DetailsTable(props: Props) {
	const id = useId();

	return (
		<div className='details-table'>
			<div className="details-table-header">
				<span>{props.title}</span>
				<span>{props.amount}</span>
			</div>
			<ul className="details-table-body">
				{props.data.map((item) => <li key={`${item.title} [${id}] ${item.value}`}>{item.title} <span>{item.value}</span></li>)}
			</ul>
		</div>
	);
}

export default DetailsTable;