import './style.css';

interface Props {
	title?: string;
	options: string[];
	selected?: any;
	setter: any;
}

function Selector(props: Props) {
	function handleSelection(option: string) {
		props.setter(option);
	}

	return (
		<ul className='selector'>
			{props.options.map((option) => {
				return <li key={option} className={props.selected === option ? "selector-item active" : "selector-item"} onClick={() => handleSelection(option)}>{option}</li>;
			})}
		</ul>
	);
}

export default Selector;