import { useState } from 'react';
import Icons from './../../../data/icons';
import './style.css';

interface Props {
	label: string;
	options: string[];
	selected: any;
	setter: any;
}

function DropdownInput(props: Props) {
	const [active, setActive] = useState(false);

	function handleSelection(option: string) {
		props.setter(option);
		setActive(false);
	}

	return (
		<div className="input-container">
			<label className="input-container-label">{props.label}</label>
			<div className={active ? 'input-container-field dropdown-input active' : 'input-container-field dropdown-input'}>
				<span onClick={() => setActive((prev) => !prev)}>{props.selected} <Icons.ArrowDownIcon /></span>
				<ul>{props.options.map((option) => <li key={option} onClick={() => handleSelection(option)} className={option === props.selected ? "selected" : undefined}>{option}</li>)}</ul>
			</div>
		</div>
	);
};

export default DropdownInput;