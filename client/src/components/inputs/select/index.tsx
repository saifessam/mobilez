import { useEffect, useState } from 'react';
import { ReactComponent as ArrowDownIcon } from '../../../assets/svgs/icons/arrow-down.svg';
import './style.css';

interface Props {
	label: string;
	name: string;
	options?: string[];
	selected: any;
	colors?: { name: string; hex: string; }[];
	setter: any;
}

function SelectInput(props: Props) {
	const [active, setActive] = useState(false);
	const [value, setValue] = useState<string | null>(null);

	useEffect(() => props.setter((prev: any) => ({ ...prev, [props.name]: value })), [value]);

	function handleSelection(option: string) {
		setValue(option);
		setActive(false);
	}

	function renderOptions() {
		if (props.options) return props.options.map((option) => <li key={option} onClick={() => handleSelection(option)} className={option === props.selected ? "selected" : undefined}>{option}</li>);
		if (props.colors) return props.colors.map((color) => <li key={color.hex} onClick={() => handleSelection(color.name)} className={color === props.selected ? "selected" : undefined}><span id="color" style={{ backgroundColor: color.hex }}></span>{color.name}</li>);
	}

	return (
		<div className="input-container">
			<label className="input-container-label">{props.label}</label>
			<div className={active ? 'input-container-field dropdown-input active' : 'input-container-field dropdown-input'}>
				<span onClick={() => setActive((prev) => !prev)}>{props.selected} <ArrowDownIcon /></span>
				<ul>{renderOptions()}</ul>
			</div>
		</div>
	);
};

export default SelectInput;