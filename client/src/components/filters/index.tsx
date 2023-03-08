import './style.css';

interface Props {
	children?: React.ReactNode;
	isShown: boolean;
}

function Filters(props: Props) {
	return (
		<div className={props.isShown ? 'filters active' : 'filters'}>
			<div className="filters-header"><span>Filters</span></div>
			<div className="filters-body">{props.children}</div>
		</div>
	);
}

export default Filters;